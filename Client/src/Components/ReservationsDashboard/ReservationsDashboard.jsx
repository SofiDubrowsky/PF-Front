import style from "./ReservationsDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { getReservations } from "../../redux/Actions/getReservations";
import { getActivities } from "../../redux/Actions/getActivities";
import { getStores } from "../../redux/Actions/getStores";
import { deleteReservation } from "../../redux/Actions/deleteReservations";
import { getUserByEmail } from "../../redux/Actions/getUserByEmail";
import { useNavigate } from "react-router-dom";
import {
  orderDate,
  allFiltersAdmin,
  setFiltersAdmin,
  setOrderByDate,
} from "../../redux/Actions/filtersAdmin";
import { format } from "date-fns-tz";
import Swal from "sweetalert2";
import axios from "axios";

const ReservationsDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getReservations());
    dispatch(getActivities());
    dispatch(getStores());
  }, []);

  const reservations = useSelector((state) => state.reservationsFiltered);
  const activities = useSelector((state) => state.activities);
  const stores = useSelector((state) => state.stores);
  const filtersSelected = useSelector((state) => state.filtersAdmin);
  const orderSelected = useSelector((state) => state.orderDate);


  const [email, setEmail] = useState("");
  const [storeFilter, setStoreFilter] = useState(filtersSelected.store);
  const [activityFilter, setActivityFilter] = useState(
    filtersSelected.activity
  );
  const [filterDate, setFilterDate] = useState(filtersSelected.date);
  const [date, setDate] = useState("");


  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(4);
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations?.slice(
    indexOfFirstReservation,
    indexOfLastReservation
  );

  const totalPages = Math.ceil(reservations?.length / reservationsPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDelete = (event, id, date, cost, user, activity, hour, store) => {
    event.preventDefault();
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar Reserva',
      text: "⚠︎ ¿Esta seguro de eliminar esta reserva? ⚠︎",
      showConfirmButton: true,
      showCancelButton: true, 
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Volver', 
      color: "#FFFFFF",
      background: "#666",
      allowOutsideClick: () => !Swal.isLoading(), 
      preConfirm: async () => {
        try {
          await dispatch(deleteReservation(id));
          await dispatch(getReservations());
          await axios.post('http://localhost:3001/refund/admin', {
          reservId: id,
          activity: activity,
          date: date,
          hour: hour,
          cost: cost,
          user: user,
          store: store,});
          
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000).then(
              setTimeout(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Reserva eliminada con éxito',
                  text: 'La reserva ha sido eliminada correctamente.',
                  showConfirmButton: false,
                  color: "#FFFFFF",
                  background: "#666",
                  timer: 2000,
                })
              }, 1000)
              )
          });
        } catch (error) {
          console.error(error);
          return Promise.reject();
        }
      },
    });
    if (result.isConfirmed) {
      Swal.close();
    } else {
      navigate("/admin");
    }
  };


  const handleChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getUserByEmail(email));
    setEmail("");
  };

  const handleFilterActivity = (event) => {
    event.preventDefault();
    setActivityFilter(event.target.value);
  };

  const handleFilterStore = (event) => {
    event.preventDefault();
    setStoreFilter(event.target.value);
  };

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  const handleFilter = () => {
    let splitDate = filterDate.split("-").reverse().join("/");
    let filters = {
      store: storeFilter,
      activity: activityFilter,
      date: splitDate,
    };

    dispatch(setFiltersAdmin(filters));
    dispatch(allFiltersAdmin(filters));
    setDate("");
  };

  const orderByDate = (event) => {
    event.preventDefault();
    dispatch(setOrderByDate(event.target.value));
    dispatch(orderDate(event.target.value));
    setDate(event.target.value);
  };

  const today = format(new Date(), "dd/MM/yyyy").toString();

  return (
    <div className={style.main}>
      <div className={style.header}>
        <div className={style.inputSearch}>
          <input
            onChange={(event) => handleChange(event)}
            type="text"
            placeholder="Buscar por email"
            value={email}
          />
          <div
            type="submit"
            onClick={handleSubmit}
            value="buscar"
            className={style.icon}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#FFFFFF"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </div>
        </div>
        <div className={style.today}>
          <h3>Hoy: {today}</h3>
        </div>
      </div>
      <div className={style.filtersContainer}>
        <div className={style.filters}>
          <select
            onChange={(event) => orderByDate(event)}
            value={orderSelected}
          >
            <option value="" disabled hidden>
              Ordenar
            </option>
            <option value="ascendent">Antiguas</option>
            <option value="descendent">Recientes</option>
          </select>
        </div>
        <div className={style.filters}>
          <select
            onChange={(event) => handleFilterActivity(event)}
            value={activityFilter}
          >
            <option value="all">Actividades</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.name}>
                {activity.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.filters}>
          <select
            onChange={(event) => handleFilterStore(event)}
            value={storeFilter}
          >
            <option value="all">Sucursal</option>
            {stores.map((store) => (
              <option key={store.id} value={store.name}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.filters}>
          <input
            type="date"
            min="2022-01-01"
            max="2028-01-01"
            value={filterDate}
            onChange={handleDateChange}
            className={style.inputDate}
          />
        </div>
        <button type="submit" onClick={handleFilter} className={style.btnApply}>
          Aplicar
        </button>
      </div>

      <div>
        <div class="relative mx-10 mb-10 overflow-x-auto shadow-md sm:rounded-lg">
          <table class=" w-full  text-sm text-left text-white">
            <thead class=" text-white text-base uppercase  bg-dark-grey ">
              <tr>
                <th scope="col" class="px-6 py-3 ">
                  Actividad
                </th>
                <th scope="col" class="px-6 py-3">
                  Usuario
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" class="px-6 py-3">
                  Horario
                </th>
                <th scope="col" class="px-6 py-3">
                  Sucursal
                </th>
                <th scope="col" class="px-6 py-3">
                  Estado
                </th>
                <th scope="col" class="px-6 py-3">
                  Borrar
                </th>
              </tr>
            </thead>
            {Array.isArray(currentReservations) &&
              currentReservations?.map((reservation) => {
                return (
                  <tbody>
                    <tr class="border-b bg-light-grey dark:border-white ">
                      <th
                        scope="row"
                        class="px-6 py-4 text-base capitalize tracking-widest	font-bold bg-light-grey text-white whitespace-nowrap"
                      >
                        {reservation?.activity?.name}
                      </th>
                      <td class="px-6 py-4 ">{reservation?.user?.name}</td>
                      <td class="px-6 py-4 ">{reservation?.user?.email}</td>
                      <td class="px-6 py-4">{reservation?.date}</td>
                      <td class="px-6 py-4">{reservation?.hour}</td>
                      <td class="px-6 py-4">
                        {reservation?.activity?.stores?.map(
                          (store) => store.name
                        )}
                      </td>
                      <td class="px-6 py-4">
                        {reservation?.pay ? "Pagado" : "No pagado"}
                      </td>

                      <td class="px-6 py-4">
                        <button
                          onClick={(event) =>
                            handleDelete(event, reservation?.id, reservation?.date, reservation?.cost, reservation?.user?.name, reservation?.activity?.name, reservation?.hour, reservation?.activity?.stores[0]?.name)
                          }
                          className={style.editButton2}
                        >
                          <svg
                            viewBox="0 0 448 512"
                            className={style.editSvgIcon}
                          >
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
      <div className={style.pagination}>
        <button
          className={style.paginationButton}
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          <h1>{"<"}</h1>
        </button>

        <h3 className={style.pag}>{`${currentPage}/${totalPages}`}</h3>

        <button
          className={style.paginationButton}
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          <h1>{">"}</h1>
        </button>
      </div>
    </div>
  );
};

export default ReservationsDashboard;
