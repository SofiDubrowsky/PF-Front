import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./Success.module.css";
import { NavLink } from "react-router-dom";
import { getUser } from "../../redux/Actions/getUser";
import getActivities from "../../redux/Actions/getActivities";
import axios from 'axios';

// const handleReservationPost = async (reservation) => {
//   await axios.post('http://localhost:3001/reservations', reservation);
//   // localStorage.removeItem('reservation');
// };

const Success = () => {
  const userDetail = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const activities = useSelector((state)=>state.allActivities)
  
  const storedReservation = localStorage.getItem('reservation');
  const reservation = storedReservation ? JSON.parse(storedReservation) : null;
  const idUser = reservation?.userId
  const idReserva = reservation?.id

  useEffect(()=>{
    async function putReserva(){
      await axios.put(`http://localhost:3001/reservations/${idReserva}`)
    }
    putReserva()
  }, [])
  const activityName = ((activities?.find(act=>act?.id==Number(reservation?.activityId)))?.name)


  useEffect(() => {
    dispatch(getUser(idUser));
  }, []);
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className={style.success}>
        <h1>Se ha resgistrado tu pago exitosamente!</h1>
        <div className={style.image}>
        <img src="https://www.jagranimages.com/images/newimg/19052020/19_05_2020-tiding_shoe_lace_20283980.jpg" alt="Ready!" />
           <div className={style.column}>
            <div className={style.receipt}>
              <div>
                <h3>Gracias {userDetail?.name}!</h3>
                <h3>Estos son los datos de tu reserva:</h3>
                <h4>Actividad: {activityName}</h4>
                <h4>Dia: {reservation?.date}</h4>
                <h4>Horario: {reservation?.hour} hs</h4>
                <h4>Monto: ${reservation?.cost}</h4>
              </div>
              <button className={style.nav1}>Enviar Datos a mi e-mail</button>
            </div>

            <div className={style.buttons}>
              <div className={style.nav}>
              <NavLink to="/home">
                Volver al inicio
              </NavLink>
              </div>
              <img src="https://www.freeiconspng.com/uploads/check-mark-ok-png-10.png" className={style.check} alt="" />
              <div className={style.nav}>
              <NavLink to="/dashboard">
              Ver mis reservas
              </NavLink>
              </div>
            </div>
           </div>

        </div>
    </div>
  );

  
};

export default Success;