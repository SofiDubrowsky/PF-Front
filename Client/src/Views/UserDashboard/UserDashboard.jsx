import style from "./UserDashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../redux/Actions/getUser";
import getActivities from "../../redux/Actions/getActivities";
import image from "../../assets/logo-blanco.png";
import { useState } from "react";

const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(3);

  const userDetail = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const idUser = localStorage.getItem("clientId");
  const activities = useSelector((state) => state.allActivities);

  useEffect(() => {
    dispatch(getUser(idUser));
  }, []);
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const reservations = (userDetail?.reservations)?.sort((a, b) => b.id - a.id);
 
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = reservations?.slice(indexOfFirstGame, indexOfLastGame);
  
  
  
  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(reservations?.length / gamesPerPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className={style.user}>
      <div className={style.title}>
        <div className={style.imgBox}>
          <img
            className={style.img}
            src="https://img.freepik.com/free-icon/user_318-804790.jpg"
            alt=""
          />
        </div>
        <div className={style.data}>
          <img src={image} alt="" />
          <h1 style={{ color: "#9AC71F" }}>Usuario: {userDetail?.name}</h1>
          <h2>E-mail: {userDetail?.email}</h2>
          <h2>Telefono: {userDetail?.phone} </h2>
          <button className={style.btn}>Editar Datos</button>
          
        <button className={style.btn}>
          <NavLink
            to="/home"
            className={style.nav}
          >
            Volver
          </NavLink>
        </button>
        </div>
      </div>
      
      <div className={style.games}>
      <h1 className={style.reserva}>Reservas </h1>
      <div className={style.pagination}>
  <button
    className={style.paginationButton}
    disabled={currentPage === 1}
    onClick={() => paginate(currentPage - 1)}
  >
    <h3>🡸</h3>
  </button>

  {Array.from({ length: Math.min(3, Math.ceil(reservations?.length / gamesPerPage)) }).map(
    (item, index) => {
      const pageNumber = currentPage + index - 1;
      const totalPages = Math.ceil(reservations?.length / gamesPerPage);

      if (pageNumber >= 1 && pageNumber <= totalPages) {
        return (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`${style.paginationButton} ${
              currentPage === pageNumber ? style.active : ""
            }`}
          >
            {pageNumber}
          </button>
        );
      }

      return null;
    }
  )}

  <button
    className={style.paginationButton}
    disabled={currentPage === Math.ceil(reservations?.length / gamesPerPage)}
    onClick={() => paginate(currentPage + 1)}
  >
    <h3>🡺</h3>
  </button>
</div>
      {currentGames?.length > 0 ? (
          currentGames?.map((reserv) => {
            return (
              <div className={style.gameContainer} key={reserv.id}>
                <div className={style.containerImageReservation}>
                  {reserv?.pay === true ? (
                    <img
                      className={style.imageCheck}
                      src="https://www.iconpacks.net/icons/2/free-check-mark-icon-3281-thumb.png"
                      alt="notFound"
                    />
                  ) : (
                    <img
                      className={style.imageCheck}
                      src="https://cdn-icons-png.flaticon.com/128/399/399426.png"
                      alt="notFound"
                    />
                  )}
                </div>
                <div className={style.containerData}>
                  <div className={style.data}>
                    <h3 style={{ color: "#9AC71F" }}>
                      Reserva:{" "}
                      {activities
                        ?.find((act) => act?.id === Number(reserv?.activityId))
                        ?.name?.toUpperCase()}
                    </h3>
                    <h4>
                      Fecha: {reserv?.date} {reserv?.hour} hs
                    </h4>
                    <h4>
                      Sucursal:{" "}
                      {activities
                        ?.find((act) => act?.id === Number(reserv?.activityId))
                        ?.stores?.map((e) => e.name)}
                    </h4>
                    <h4>
                      ${" "}
                      {
                        activities?.find(
                          (act) => act?.id === Number(reserv?.activityId)
                        )?.cost
                      }
                    </h4>
                    
                      {reserv?.pay === true ? (
                        <h3 style={{ color: "green" }}>Estado: Pago Aprobado</h3>
                      ) : (
                        <h3 style={{ color: "red" }}>Estado: No Aprobado</h3>
                      )}
                    
                  </div>
                </div>
                <div className={style.containerImage}>
                  <img
                    className={style.image}
                    src={
                      activities?.find(
                        (act) => act?.id === Number(reserv?.activityId)
                      )?.picture[0]
                    }
                    alt="notFound"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <h2 className={style.notFound}>No hay reservas por el momento</h2>
        )}
      </div>
    

    </div>
  );
};

export default UserDashboard;
