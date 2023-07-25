import style from "./ConfigDashboard.module.css";
import { getAdmins } from "../../redux/Actions/getAdmin";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../redux/Actions/deleteUser";
import  UpdateAdmin  from "../UpdateAdmin/UpdateAdmin"


const ConfigDashboard = () => {
  const admins = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  },[]);

  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage] = useState(4);
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = admins?.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const [isEditButtonDisabled, setIsEditButtonDisabled] = useState(admins.length < 2);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setIsEditButtonDisabled(currentAdmins.length < 2);
  },[admins]);


  useEffect(() => {
    dispatch(getAdmins());
    setUpdate(false)
  },[update])

  const totalPages = Math.ceil(admins?.length / adminsPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDelete = (event, id) => {
    event.preventDefault();
    dispatch(deleteUser(id));
    setTimeout(() => {
      
      setUpdate(true)
    }, 1000);
  };

  const createAdmin = (event) => {
    event.preventDefault();
    setShowUpdate(true);
    setShowBackdrop(true);
  }

  const handleClose = () => {
    setShowUpdate(false);
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
      {showUpdate && (
          <div className={style.popup}>
            <div className={style.container}>
              <h2>Crear Administrador</h2>
            </div>
            <div className={style.containerBtn}>
              <UpdateAdmin  setUpdate={setUpdate} setShowUpdate={setShowUpdate} setShowBackdrop={setShowBackdrop}/>
              <button className={style.btnCancel} onClick={handleClose}>
                Cancelar
              </button>
            </div>
          </div>
        )}
        {showBackdrop && <div className={style.backdrop} />}
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

export default ConfigDashboard;
