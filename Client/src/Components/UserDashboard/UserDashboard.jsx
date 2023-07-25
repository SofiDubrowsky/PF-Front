import style from "./UserDasboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../redux/Actions/getAllUsers";
import { getUsersByName } from "../../redux/Actions/getUserByName";
import { deleteUser } from "../../redux/Actions/deleteUser";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.allUsers);

  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(4);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPages = Math.ceil(users?.length / usersPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getUsersByName(name));
  };

  const handleDelete = (event, id) => {
    event.preventDefault();
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar Usuario',
      text: "⚠︎ ¿Esta seguro de eliminar este usuario? ⚠︎",
      showConfirmButton: true,
      showCancelButton: true, 
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Volver', 
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
                  icon: 'success',
                  title: 'Usuario eliminado con éxito',
                  text: 'El usuario ha sido eliminado correctamente.',
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
       Swal.fire({
        icon: 'success',
        title: 'Usuario eliminado con éxito',
        text: 'El usuario ha sido eliminado correctamente.',
        color: "#FFFFFF",
        background: "#666",
        timer: 2000,
      });
      navigate("/admin");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.principal}>
        <div className={style.inputSearch}>
          <input
            type="text"
            placeholder="Buscar usuario"
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

export default UserDashboard;
