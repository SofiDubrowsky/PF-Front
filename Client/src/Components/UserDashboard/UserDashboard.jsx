import style from "./UserDasboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../redux/Actions/getAllUsers";
import { getBanUsers } from "../../redux/Actions/getBanUsers";
import { restoreUser } from "../../redux/Actions/restoreUser";
import { getUsersByName } from "../../redux/Actions/getUserByName";
import { getUsersBanByName } from "../../redux/Actions/getUsersBanByName";
import { deleteUser } from "../../redux/Actions/deleteUser";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.UserFiltered);
  const banUsers = useSelector((state) => state.banUsersFiltered);

  const [name, setName] = useState("");
  const [banName, setBanName] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getBanUsers());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(4);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

  const [currentBanPage, setCurrentBanPage] = useState(1);
  const [usersBanPerPage] = useState(4);
  const indexOfLastBanUser = currentBanPage * usersBanPerPage;
  const indexOfFirstBanUser = indexOfLastBanUser - usersBanPerPage;
  const currentBanUsers = banUsers?.slice(
    indexOfFirstBanUser,
    indexOfLastBanUser
  );

  const totalPages = Math.ceil(users?.length / usersPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const totalBanPages = Math.ceil(banUsers?.length / usersBanPerPage);
  const paginateBan = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalBanPages) {
      setCurrentBanPage(pageNumber);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleInputBanChange = (event) => {
    event.preventDefault();
    setBanName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getUsersByName(name));
  };

  const handleBanSubmit = (event) => {
    event.preventDefault();
    dispatch(getUsersBanByName(banName));
  };

  const handleDelete = (event, id) => {
    event.preventDefault();
    Swal.fire({
      icon: "warning",
      title: "Eliminar Usuario",
      text: "⚠︎ ¿Esta seguro de eliminar este usuario? ⚠︎",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Volver",
      color: "#FFFFFF",
      background: "#666",
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          await dispatch(deleteUser(id));
          await dispatch(getAllUsers());
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000).then(
              setTimeout(() => {
                Swal.fire({
                  icon: "success",
                  title: "Usuario eliminado con éxito",
                  text: "El usuario ha sido eliminado correctamente.",
                  color: "#FFFFFF",
                  background: "#666",
                  timer: 2000,
                });
              }, 1000)
            );
          });
        } catch (error) {
          console.error(error);
          return Promise.reject();
        }
      },
    });
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Usuario eliminado con éxito",
        text: "El usuario ha sido eliminado correctamente.",
        color: "#FFFFFF",
        background: "#666",
        timer: 2000,
      });
      navigate("/admin");
    } else {
      navigate("/admin");
    }
  };

  const handleRestore = (event, id) => {
    event.preventDefault();
    Swal.fire({
      icon: "warning",
      title: "Restaurar Usuario",
      text: "⚠︎ ¿Esta seguro de restaurar este usuario? ⚠︎",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "restaurar",
      cancelButtonText: "Volver",
      color: "#FFFFFF",
      background: "#666",
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          await dispatch(restoreUser(id));
          await dispatch(getBanUsers());
          await dispatch(getAllUsers())
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000).then(
              setTimeout(() => {
                Swal.fire({
                  icon: "success",
                  title: "Usuario restaurado con éxito",
                  text: "El usuario ha sido restaurado correctamente.",
                  color: "#FFFFFF",
                  background: "#666",
                  timer: 2000,
                });
              }, 1000)
            );
          });
        } catch (error) {
          console.error(error);
          return Promise.reject();
        }
      },
    });
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Usuario restaurado con éxito",
        text: "El usuario ha sido restaurado correctamente.",
        color: "#FFFFFF",
        background: "#666",
        timer: 2000,
      });
      navigate("/admin");
    } else {
      navigate("/admin");
    }
  }

  return (
    <div className={style.container}>
      <h2>Usuarios</h2>
      <div className={style.principal}>
        <div className={style.inputSearch}>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={name}
            onChange={handleInputChange}
          />
          <div
            type="submit"
            onClick={(event) => {
              handleSubmit(event);
              setName("");
            }}
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

      <div class="relative mx-10 mt-5 overflow-x-auto shadow-md sm:rounded-lg">
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
          {Array.isArray(currentUsers) &&
            currentUsers?.map((user) => {
              return (
                <tbody>
                  <tr class="border-b bg-light-grey dark:border-white ">
                    <th
                      scope="row"
                      class="px-6 py-4 text-base capitalize tracking-widest	font-bold bg-light-grey text-white whitespace-nowrap"
                    >
                      {user?.name}
                    </th>
                    <td class="px-6 py-4 ">{user?.email}</td>
                    <td class="px-6 py-4">{user?.phone}</td>
                    <td class="px-6 py-4">
                      <button
                        onClick={(event) => handleDelete(event, user?.id)}
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
      {totalPages<2? <div style={{height:'5rem'}}></div> :
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
      </div>}
      {/* Tabla de usuarios baneados */}
      <h2>Usuarios Banneados</h2>
      <div className={style.banUseres}>
        <div className={style.inputSearch}>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={banName}
            onChange={handleInputBanChange}
          />
          <div
            type="submit"
            onClick={(event) => {
              handleBanSubmit(event);
              setBanName("");
            }}
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

      <div class="relative mx-10 mt-5 overflow-x-auto shadow-md sm:rounded-lg">
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
                Restaurar
              </th>
            </tr>
          </thead>
          {Array.isArray(currentBanUsers) &&
            currentBanUsers?.map((user) => {
              return (
                <tbody>
                  <tr class="border-b bg-light-grey dark:border-white ">
                    <th
                      scope="row"
                      class="px-6 py-4 text-base capitalize tracking-widest	font-bold bg-light-grey text-white whitespace-nowrap"
                    >
                      {user?.name}
                    </th>
                    <td class="px-6 py-4 ">{user?.email}</td>
                    <td class="px-6 py-4">{user?.phone}</td>
                    <td class="px-6 py-4">
                      <button
                        onClick={(event) => handleRestore(event, user?.id)}
                        className={style.restoreButton}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-check"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#ffffff"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 12l5 5l10 -10" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
      {totalPages<2? <div style={{height:'5rem'}}></div> :
      <div className={style.pagination}>
        <button
          className={style.paginationButton}
          disabled={currentBanPage === 1}
          onClick={() => paginateBan(currentBanPage - 1)}
        >
          <h1>{"<"}</h1>
        </button>

        <h3 className={style.pag}>{`${currentBanPage}/${totalBanPages}`}</h3>

        <button
          className={style.paginationButton}
          disabled={currentBanPage === totalBanPages}
          onClick={() => paginateBan(currentBanPage + 1)}
        >
          <h1>{">"}</h1>
        </button>
      </div>}
    </div>
  );
};

export default UserDashboard;
