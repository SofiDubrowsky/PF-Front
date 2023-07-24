import style from "./StoresDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStores } from "../../redux/Actions/getStores";
import { NavLink } from "react-router-dom";
import { deleteStore } from "../../redux/Actions/deleteStore";

const StoresDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stores = useSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStores());
  }, []);

  const handleDelete = (event, id) => {
    event.preventDefault();
    dispatch(deleteStore(id));
    navigate("/admin");
  };
  return (
    <div className={style.container}>
        <h2>Sucursales</h2>
        <div className={style.activity}>
        <NavLink to="/postStores">
          <button className={style.button} type="button">
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
          {Array.isArray(stores) &&
            stores?.map((store) => {
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
    </div>
  );
};

export default StoresDashboard;
