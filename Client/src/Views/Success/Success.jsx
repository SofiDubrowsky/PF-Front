import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./Success.module.css";
import { NavLink } from "react-router-dom";
import { getUser } from "../../redux/Actions/getUser";
import {getActivities} from "../../redux/Actions/getActivities";
import { getStores } from "../../redux/Actions/getStores";
import axios from 'axios';
import Swal from "sweetalert2";


const Success = () => {
  const [emailSent, setEmailSent] = useState(false)
  const userDetail = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const activities = useSelector((state)=>state.allActivities)
  const stores = useSelector((state)=>state.stores)
  const storedReservation = localStorage.getItem('reservation');
  const reservation = storedReservation ? JSON.parse(storedReservation) : null;
  const idUser = reservation?.userId
  const idReserva = reservation?.id
  const idActivity = reservation?.activityId

  useEffect(()=>{
    async function putReserva(){
      // await axios.put(`http://localhost:3001/reservations/${idReserva}`)
      await axios.put(`https://sportiverse-server.onrender.com/reservations/${idReserva}`)
    }
      putReserva()  
  }, [])

  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);

  const activityName = (activities?.find(act => Number(act?.id) === Number(idActivity)))?.name
  const store = (activities?.find(act => Number(act?.id) === Number(idActivity)))?.stores[0]?.name
  const storee = stores?.find(str => str?.name?.toLowerCase()=== store?.toLowerCase())
  const storeAddress = storee?.address
 
 
  //datos para enviar por email:
  const emailInfo={
    reservId:reservation?.id,
    activity:activityName,
    date:reservation?.date,
    hour:reservation?.hour,
    cost:reservation?.cost,
    user:userDetail?.name,
    store:store,
    storeAddress:storeAddress,
  }

  useEffect(() => {
    dispatch(getUser(idUser));
  }, []);
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const sendEmailData = async () => {
    try {
      // await axios.post('http://localhost:3001/emailReservation', emailInfo);
      await axios.post('https://sportiverse-server.onrender.com/emailReservation', emailInfo);
      
      setEmailSent(true);
    // Mostrar la alerta de éxito
    Swal.fire({
      icon: 'success',
      title: 'Email enviado',
      text: 'El correo ha sido enviado correctamente',
      showConfirmButton: false,
      color: "#FFFFFF",
      background: "#666",
      timer: 3000,
      timerProgressBar: true
    });
  } catch (error) {
    console.error('Error al enviar los datos por email:', error);

    // Mostrar la alerta de error
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al enviar el correo',
      color: "#FFFFFF",
      background: "#666",
      timer: 3000,
      timerProgressBar: true
    });
  }
};

  return (
    <div className={style.success}>
        <div className={style.image}>
        <img src="https://www.jagranimages.com/images/newimg/19052020/19_05_2020-tiding_shoe_lace_20283980.jpg" alt="Ready!" />
        
           <div className={style.column}>
            <div >
           <h1 className={style.title}>Se ha resgistrado tu pago exitosamente!</h1>
           </div>
            <div className={style.receipt}>
            <img src="https://www.iconpacks.net/icons/2/free-check-mark-icon-3281-thumb.png" className={style.check} alt="Okay!" />
              <div>
                <h3>Gracias {userDetail?.name}!</h3>
                <h3>Estos son los datos de tu reserva:</h3>
                <h4>Actividad: {activityName}</h4>
                <h4>Dia: {reservation?.date}</h4>
                <h4>Horario: {reservation?.hour} hs</h4>
                <h4>Monto: ${reservation?.cost}</h4>
              </div>
              <button className={style.emailBtn} onClick={()=>{setTimeout(() => {
               sendEmailData() 
              }, 3000);}} disabled={emailSent}>Enviar Datos a mi e-mail</button>
            </div>

            <div className={style.buttons}>
              <div className={style.btn}>
              <NavLink to="/home" className={style.navlink}>
                Volver al inicio
              </NavLink>
              </div>
             
              <div className={style.btn}>
              <NavLink to="/dashboard" className={style.navlink}>
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
