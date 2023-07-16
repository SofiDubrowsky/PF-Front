import style from "./UserDashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../redux/Actions/getUser";
import getActivities from "../../redux/Actions/getActivities";
import image from "../../assets/logo-blanco.png";
const UserDashboard = () => {
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

  const reservations = userDetail?.reservations;
  // const ids = reservations?.map(act=>act.activityId)
  // const activitiesReserv = activities?.filter((act)=>(ids?.includes(act?.id)))
  console.log(activities);

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
        </div>
      </div>
      <div className={style.games}>
        {reservations?.length > 0 ? (
          reservations?.map((reserv) => {
            return (
              <div className={style.gameContainer}>
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
                        ?.find((act) => act?.id == Number(reserv?.activityId))
                        ?.name?.toUpperCase()}
                    </h3>
                    <h4>
                      Fecha: {reserv?.date} {reserv?.hour} hs
                    </h4>
                    <h4>
                      Sucursal:{" "}
                      {activities
                        ?.find((act) => act?.id == Number(reserv?.activityId))
                        ?.stores?.map((e) => e.name)}
                    </h4>
                    <h4>
                      ${" "}
                      {
                        activities?.find(
                          (act) => act?.id == Number(reserv?.activityId)
                        )?.cost
                      }
                    </h4>
                    <h3>
                      {reserv?.pay === true ? (
                        <h3 style={{ color: "green" }}>
                          Estado: Pago Aprobado
                        </h3>
                      ) : (
                        <h3 style={{ color: "red" }}>Estado: No Aprobado</h3>
                      )}
                    </h3>
                  </div>
                </div>
                <div className={style.containerImage}>
                  <img
                    className={style.image}
                    src={
                      activities?.find(
                        (act) => act?.id == Number(reserv?.activityId)
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
      <div className={style.buttonContainer}>
        <button className={style.backButton}>
          <NavLink
            to="/home"
            className={style.navStyle}
            style={{ color: "white" }}
          >
            Volver
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
