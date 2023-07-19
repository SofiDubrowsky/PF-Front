import style from "./UserDasboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReservations } from "../../redux/Actions/getReservations";

const UserDashboard = () => {
  const dispatch = useDispatch();

  const reservations = useSelector((state) => state.allReservations);

  useEffect(() => {
    dispatch(getReservations());
  }, []);

  return (
    <div className={style.container}>
      <div className={style.principal}>
        <div className={style.inputSearch}>
          <input
            //   onChange={(e) => handleinputChange(e)}
            //   type="text"
            placeholder="Buscar por usuario"
            //   value={name}
          />
          <div
            //   type="submit"
            //   onClick={handleSubmit}
            //   value="buscar"
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
                Eliminar
              </th>
            </tr>
          </thead>
          {reservations?.map((reservation) => {
            return (
              <tbody>
                <tr class="border-b bg-light-grey dark:border-white ">
                  <th
                    scope="row"
                    class="px-6 py-4 text-base capitalize tracking-widest	font-bold bg-light-grey text-white whitespace-nowrap"
                  >
                    {reservation?.user?.name}
                  </th>
                  <td class="px-6 py-4 ">{reservation?.user?.email}</td>
                  <td class="px-6 py-4">{reservation?.phone}</td>
                  <td class="px-6 py-4">
                    <button className={style.editButton2}>
                      <svg viewBox="0 0 448 512" className={style.editSvgIcon}>
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
  );
};

export default UserDashboard;
