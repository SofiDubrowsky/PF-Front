import { useEffect } from "react";
import style from "./Failure.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";


const Failure = () => {
  const reservation = localStorage.getItem('reservation');
  
  const reservationParse = reservation ? JSON.parse(reservation) : null;

  const id = reservationParse.id

  const activityId = reservationParse.activityId

  const lastLocation = `/detail/${activityId}` 

  useEffect(() => {
    const deleteReservation = async () => {
      try {
        await axios.delete(`https://sportiverse-server.onrender.com/reservations/${id}`); 
        console.log('Reserva eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar la reserva', error);
      }
    }; 
    deleteReservation();
  }, []);

  return (
    <div className={style.failure}>
        <div className={style.image}>
        <img src="https://www.vegasslotsonline.com/news/wp-content/uploads/2023/06/Shutterstock_2203178379.jpg" alt="NotReady!" />
        <div className={style.column}>
        <h1>Error: tu reserva no se ha registrado!</h1>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/011/148/562/small/right-and-wrong-vector-design-illustration-isolated-on-transparent-background-free-png.png" className={style.check} alt="" />
        <div className={style.receipt}>
          <h1>Ups!</h1>
          <h3>Parece que hubo un problema con tu pago</h3>
          <h3>Por favor intenta nuevamente o vuelve más tarde</h3>
        </div>
        <div className={style.buttons}>
        <div className={style.btn}>
        <NavLink to="/home" className={style.navlink}>
         Volver al inicio
        </NavLink>
        </div>
        <div className={style.btn}>
        <NavLink to={lastLocation} className={style.navlink}>
         Reintentar
        </NavLink>
        </div>
        </div>
        </div>
        </div>
    </div>
  );

  
};

export default Failure;