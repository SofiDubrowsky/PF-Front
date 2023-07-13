import style from "./UserDashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../redux/Actions/getUser";
import getActivities from "../../redux/Actions/getActivities";
const UserDashboard = () => {
const userDetail = useSelector((state) => state.userDetail);
const dispatch = useDispatch();
const idUser = useSelector((state)=>state.clientId)
const activities = useSelector((state)=>state.allActivities)

useEffect(() => {
    dispatch(getUser(idUser));
}, []);
useEffect(() => {
        dispatch(getActivities());
}, [dispatch]);

const reservations= userDetail?.reservations
// const ids = reservations?.map(act=>act.activityId)
// const activitiesReserv = activities?.filter((act)=>(ids?.includes(act?.id)))
console.log(activities);

  return (
    <div className={style.user}>
      <div className={style.title}>
        <h1>Usuario: {userDetail?.name}</h1>
        <h3>Email: {userDetail?.email}</h3>
        <h3>Telefono: {userDetail?.phone}</h3>
      </div>
    
      {reservations?.length > 0 ? (
        reservations?.map((reserv) => {
          return (
            <div className={style.gameContainer}>
              <div className={style.containerImage}>
                {(reserv?.pay===true)?<img className={style.image} src="https://www.iconpacks.net/icons/2/free-check-mark-icon-3281-thumb.png" alt="notFound"/>:<img className={style.image} src="https://cdn-icons-png.flaticon.com/128/399/399426.png" alt="notFound"/>}
              </div>
              <div className={style.containerData}>
                <div className={style.data}>
                  <h3>Reserva:</h3>
                  <h4>{((activities?.find(act=>act?.id==Number(reserv?.activityId)))?.name)?.toUpperCase()}</h4>
                  <h4>Fecha: {reserv?.date} a las {reserv?.hour} hs</h4>
                  <h4>Sucursal: {(activities?.find(act=>act?.id==Number(reserv?.activityId))?.stores)?.map(e=>e.name)}</h4>
                  <h4>$ {((activities?.find(act=>act?.id==Number(reserv?.activityId)))?.cost)}</h4>
                  <h3>Estado: {(reserv?.pay===true)?"Pago Aprobado":"No Aprobado"}</h3>
              </div>
             </div>
             <div className={style.containerImage}>
                <img className={style.image} src={((activities?.find(act=>act?.id==Number(reserv?.activityId)))?.picture[0])} alt="notFound"/>
              </div>
            </div>
          );
        })
      ) : (
        <h2 className={style.notFound}>No hay reservas</h2>
      )}
      <div className={style.buttonContainer}>
        <button className={style.backButton}>
          <NavLink to="/home" className={style.navStyle} style={{color: "white"}}>Volver</NavLink>
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;