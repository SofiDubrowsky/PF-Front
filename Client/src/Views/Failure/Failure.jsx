import { useEffect } from "react";
import style from "./Failure.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";


const Failure = () => {
  const reservation = localStorage.getItem('reservation');
  
  const reservationParse = reservation ? JSON.parse(reservation) : null;

  const id = reservationParse.id

  useEffect(() => {
    const deleteReservation = async () => {
      try {
        await axios.delete(`http://localhost:3001/reservations/${id}`); 
        console.log('Reserva eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar la reserva', error);
      }
    };
  
    deleteReservation();
  }, []);

  return (
    <div className={style.failure}>
        <h1>Error: tu reserva no se ha registrado!</h1>
        <div className={style.image}>
        <img src="https://www.vegasslotsonline.com/news/wp-content/uploads/2023/06/Shutterstock_2203178379.jpg" alt="NotReady!" />
        <div className={style.nav}>
        <NavLink to="/home">
         Volver al inicio
        </NavLink>
        </div>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/011/148/562/small/right-and-wrong-vector-design-illustration-isolated-on-transparent-background-free-png.png" className={style.check} alt="" />
        <div className={style.nav}>
        <NavLink to="/dashboard">
         Ver mis reservas
        </NavLink>
        </div>
        </div>
    </div>
  );

  
};

export default Failure;