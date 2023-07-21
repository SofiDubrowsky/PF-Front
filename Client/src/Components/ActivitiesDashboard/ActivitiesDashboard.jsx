import { useEffect } from "react";
import style from "./ActivitiesDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getActivities } from "../../redux/Actions/getActivities";
import { deleteActivity } from "../../redux/Actions/deleteActivity";

const ActivitiesDashboard = () => {
  const activities = useSelector((state) => state.activities);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  const handleDelete = (event, id) => {
    event.preventDefault();
    dispatch(deleteActivity(id));
    navigate("/admin")
  }

  return (
    <div className={style.mainContainer}>
      <h2>Actividades</h2>
      <div className={style.activity}>
        <NavLink to="/post">
          <button className={style.button} type="button">
            <span className={style.button__text}>Crear actividad</span>
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
                Sucursal
              </th>
              <th scope="col" class="px-6 py-3">
                Jugadores
              </th>
              <th scope="col" class="px-6 py-3">
                Edad
              </th>
              <th scope="col" class="px-6 py-3">
                Días
              </th>
              <th scope="col" class="px-6 py-3">
                Hora
              </th>
              <th scope="col" class="px-6 py-3">
                Editar
              </th>
              <th scope="col" class="px-6 py-3">
                Borrar
              </th>
            </tr>
          </thead>
          {Array.isArray(activities) &&
            activities?.map((activity) => {
              return (
                <tbody>
                  <tr class="border-b bg-light-grey dark:border-white ">
                    <th
                      scope="row"
                      class="px-6 py-4 text-base capitalize tracking-widest	font-bold bg-light-grey text-white whitespace-nowrap"
                    >
                      {activity?.name}
                    </th>
                    <td class="px-6 py-4">{activity?.stores[0]?.name}</td>
                    <td class="px-6 py-4">
                      {activity?.players.map((player) => player)}
                    </td>
                    <td class="px-6 py-4 ">{activity?.age[0]}</td>
                    <td class="px-6 py-4 ">
                      {activity?.days?.map((day) => day).join(", ")}
                    </td>
                    <td class="px-6 py-4 ">
                      {activity?.hours?.map((hour) => hour).join(", ")}
                    </td>
                    <td class="px-6 py-4">
                      <button className={style.editButton1}>
                        <svg className={style.editSvgIcon} viewBox="0 0 512 512">
                          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                        </svg>
                      </button>
                    </td>
                    <td class="px-6 py-4">
                      <button
                        onClick={(event) => handleDelete(event, activity?.id)}
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
  );
};

export default ActivitiesDashboard;
