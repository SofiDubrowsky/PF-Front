import style from "./ConfigDashboard.module.css";
import { getAdmins } from "../../redux/Actions/getAdmin";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../redux/Actions/deleteUser";
import UpdateAdmin from "../UpdateAdmin/UpdateAdmin";
import EditAdmin from "../EditAdmin/EditAdmin";
import Swal from "sweetalert2";

const ConfigDashboard = () => {
  const admins = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage] = useState(4);
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = admins?.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const [isEditButtonDisabled, setIsEditButtonDisabled] = useState(
    admins.length < 2
  );
  const [showUpdate, setShowUpdate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [update, setUpdate] = useState(false);
  const [idEdit, setIdEdit] = useState(0)

  useEffect(() => {
    setIsEditButtonDisabled(currentAdmins.length < 2);
  }, [admins]);

  useEffect(() => {
    dispatch(getAdmins());
    setUpdate(false);
  }, [update]);

  const totalPages = Math.ceil(admins?.length / adminsPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDelete = (event, id) => {
    event.preventDefault();
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar Administrador',
      text: "⚠︎ ¿Esta seguro de eliminar este administrador? ⚠︎",
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
          setTimeout(() => {
            setUpdate(true);
          }, 1000);
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000).then(
              setTimeout(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Administrador eliminado con éxito',
                  text: 'El administrador ha sido eliminado correctamente.',
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

  const createAdmin = (event) => {
    event.preventDefault();
    setShowUpdate(true);
    setShowBackdrop(true);
  };

  const handleEdit = (event, id) => {
    event.preventDefault();
    setIdEdit(id)
    setShowEdit(true);
    setShowBackdrop(true);
  };

  const handleClose = () => {
    setShowUpdate(false);
    setShowEdit(false)
    setShowBackdrop(false);
  };

  return (
    <div className={style.container}>
      <h2>Administradores</h2>
      <div className={style.activity}>
        <button className={style.button} type="button" onClick={createAdmin}>
          <span className={style.button__text}>Crear Admin</span>
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
                Editar
              </th>
              <th scope="col" class="px-6 py-3">
                Eliminar
              </th>
            </tr>
          </thead>
          {Array.isArray(currentAdmins) &&
            currentAdmins?.map((admin) => {
              return (
                <tbody>
                  <tr class="border-b bg-light-grey dark:border-white ">
                    <th
                      scope="row"
                      class="px-6 py-4 text-base capitalize tracking-widest	font-bold bg-light-grey text-white whitespace-nowrap"
                    >
                      {admin?.name}
                    </th>
                    <td class="px-6 py-4 ">{admin.email}</td>
                    <td class="px-6 py-4">{admin.phone}</td>
                    <td class="px-6 py-4">
                      <button
                        onClick={(event) => handleEdit(event, admin?.id)}
                        className={style.editButton2}
                        disabled={isEditButtonDisabled}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-pencil"
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
                          <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                          <path d="M13.5 6.5l4 4" />
                        </svg>
                      </button>
                    </td>
                    <td class="px-6 py-4">
                      <button
                        onClick={(event) => handleDelete(event, admin?.id)}
                        className={style.editButton2}
                        disabled={isEditButtonDisabled}
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
      {showEdit && (
        <div className={style.popup}>
          <div className={style.container}>
            <h2>Cambiar cotraseña</h2>
          </div>
          <div className={style.containerBtn}>
            <EditAdmin
              setUpdate={setUpdate}
              setShowEdit={setShowEdit}
              setShowBackdrop={setShowBackdrop}
              id={idEdit}
            />
            <button className={style.btnCancel} onClick={handleClose}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      {showUpdate && (
        <div className={style.popup}>
          <div className={style.container}>
            <h2>Crear Administrador</h2>
          </div>
          <div className={style.containerBtn}>
            <UpdateAdmin
              setUpdate={setUpdate}
              setShowUpdate={setShowUpdate}
              setShowBackdrop={setShowBackdrop}
            />
            <button className={style.btnCancel} onClick={handleClose}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      {showBackdrop && <div className={style.backdrop} />}
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
    </div>
  );
};

export default ConfigDashboard;
