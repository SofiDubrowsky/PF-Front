import style from "./UserDashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const UserDashboard = () => {
//   const ??? = useSelector((state) => state.???);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getStores());
//   }, []);
const reservations=[]

  return (
    <div className={style.user}>
      <div className={style.title}>
        <h1>Usuario: (username)</h1>
        <h3>Email: (usermail)</h3>
        <img src="userimage" alt="NotFound" />
      </div>

      {reservations.length !== 0 ? (
        reservations.map((store) => {
          return (
            <div className={style.gameContainer}>
              <div className={style.containerImage}>
                <img className={style.image} src="activity.picture" alt="notFound"/>
              </div>
              <div className={style.containerData}>
                <div className={style.data}>
                  <h3>Reserva:</h3>
                  <h4>reservations.date</h4>
                  <h4>reservations.hour</h4>
                  <h4>activity.store</h4>
                  <h4>activity.cost</h4>
                </div>
              </div>
            <h1>Estado:reservations.status</h1>
            </div>
          );
        })
      ) : (
        <p>No hay reservas</p>
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
