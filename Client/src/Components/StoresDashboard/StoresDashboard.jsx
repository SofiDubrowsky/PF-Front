import style from "./StoresDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStores } from "../../redux/Actions/getStores";
import { NavLink } from "react-router-dom";
import { deleteStore } from "../../redux/Actions/deleteStore";
import Swal from "sweetalert2";

const StoresDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stores = useSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStores());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [storesPerPage] = useState(4);
  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  const currentStores = stores?.slice(indexOfFirstStore, indexOfLastStore);

  const totalPages = Math.ceil(stores?.length / storesPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const handleDelete = (event, id) => {
    event.preventDefault();
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar Sucursal',
      text: "⚠︎ ¿Esta seguro de eliminar esta sucursal? ⚠︎",
      showConfirmButton: true,
      showCancelButton: true, 
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Volver', 
      color: "#FFFFFF",
      background: "#666",
      allowOutsideClick: () => !Swal.isLoading(), 
      preConfirm: async () => {
        try {
          await dispatch(deleteStore(id));
          await dispatch(getStores());
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000).then(
              setTimeout(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Sucursal eliminada con éxito',
                  text: 'La sucursal ha sido eliminada correctamente.',
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

  return (
    <div className={style.container}>
      <h2>Sucursales</h2>
      <div className={style.activity}>
        <NavLink to="/postStores">
          <button className={style.button} onClick={()=>(localStorage.setItem('preview', 'stores'))}type="button">
            <span className={style.button__text}>Crear sucursal</span>
            <span className={style.button__icon}>
              <svg
                className={style.svg}
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
            </span>
          </button>
        </NavLink>
      </div>
      <div class="relative mx-10 mb-10 overflow-x-auto shadow-md sm:rounded-lg">
        <table class=" w-full  text-sm text-left text-white">
          <thead class=" text-white text-base uppercase  bg-dark-grey ">
            <tr>
              <th scope="col" class="px-6 py-3 ">
                Nombre
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Teléfono
              </th>
              <th scope="col" class="px-6 py-3">
                Dirección
              </th>
              <th scope="col" class="px-6 py-3">
                Eliminar
              </th>
            </tr>
          </thead>
          {Array.isArray(currentStores) &&
            currentStores?.map((store) => {
              return (
                <tbody>
                  <tr class="border-b bg-light-grey dark:border-white ">
                    <th
                      scope="row"
                      class="px-6 py-4 text-base capitalize tracking-widest	font-bold bg-light-grey text-white whitespace-nowrap"
                    >
                      {store?.name}
                    </th>
                    <td class="px-6 py-4 ">{store.email}</td>
                    <td class="px-6 py-4">{store.phone}</td>
                    <td class="px-6 py-4">{store.address}</td>
                    <td class="px-6 py-4">
                      <button
                        onClick={(event) => handleDelete(event, store?.id)}
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

export default StoresDashboard;
