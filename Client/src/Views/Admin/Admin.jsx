import style from "./Admin.module.css";
import Nav from "../../Components/Nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReservations } from "../../redux/Actions/getReservations";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const dispatch = useDispatch();

  const reservations = useSelector((state) => state.allReservations);
  const isClient = localStorage.getItem('isClient')
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getReservations());
  }, []);

  useEffect(() => {
    isClient === 'true' && navigate('/home')
  },[isClient])

  return (
    <div>
      <h2>Reservas:</h2>
      <div class="relative mx-10 mb-10 overflow-x-auto shadow-md sm:rounded-lg">
        <table class=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-white uppercase  bg-dark-grey dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3 ">
                Actividad
              </th>
              <th scope="col" class="px-6 py-3">
                Usuario
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
                Editar
              </th>
              <th scope="col" class="px-6 py-3">
                Borrar
              </th>
            </tr>
          </thead>
          {reservations?.map((reservation) => {
            return (
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-verde-feo">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-grey"
                  >
                    {reservation?.activity?.name}
                  </th>
                  <td class="px-6 py-4">{reservation?.user?.name}</td>
                  <td class="px-6 py-4">{reservation?.date}</td>
                  <td class="px-6 py-4">{reservation?.hour}</td>
                  <td class="px-6 py-4">
                    {reservation?.activity?.stores?.map((store) => store.name)}
                  </td>
                  <td class="px-6 py-4">
                    {reservation?.pay ? "Pagado" : "No pagado"}
                  </td>
                  <td class="px-6 py-4">
                    <button>Editar✍🏻</button>
                  </td>
                  <td class="px-6 py-4">
                    <button>Borrar ❌</button>
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

export default Admin;
