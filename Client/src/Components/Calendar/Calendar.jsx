import styles from './Calendar.module.css'
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import es from 'date-fns/locale/es';
import { useSelector, useDispatch } from 'react-redux';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from "axios";
// import {saveInfoReservation} from '../../redux/Actions/saveInfoReservation';
// import Swal from 'sweetalert2';
import { postReservation } from '../../redux/Actions/postReservation';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { deleteReservation } from '../../redux/Actions/deleteReservations';

const VITE_CREDENTIAL_SELLER = import.meta.env.VITE_CREDENTIAL_SELLER;

export default function CalendarComponent() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const activity = useSelector((state) => state.detail);
  let selected = selectedDate ? `${selectedDate.dayName} ${format(selectedDate.date, 'dd/MM/yyyy', { locale: es })}` : null

  const dayReservations = activity?.reservations?.filter(reserv => reserv.date === selected)
  const hoursReserved = dayReservations?.map(reserv => reserv.hour)

  const id = activity?.id
  const idActLs = localStorage.getItem('detail');

  const cost = activity?.cost
  const name = activity?.name

  const idUser = localStorage.getItem('clientId');
  const loger = localStorage.getItem('loger')

  const [reservation, setReservation] = useState({
    date: '',
    cost: cost,
    hour: '',
    idUser: idUser,
    idActivity: id
  })

  const week = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  const forbiddenDays = week.filter((day) => !(activity?.days?.includes(day)));

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleDateChange = (date) => {
    const currentDate = new Date();
    if (isSameDay(date, currentDate) || date > currentDate) {
      setSelectedDate({
        date,
        dayName: capitalize(format(date, 'EEEE', { locale: es }))
      });
      setSelectedHour(null)
    }
    if (!activity.days.includes(capitalize(format(date, 'EEEE', { locale: es })))) {
      setSelectedDate({ date, dayName: "Día no válido" })
      setSelectedHour(null)
    }
    if (date < currentDate) {
      setSelectedDate({
        date, dayName: "Fecha pasada"
      })
      setSelectedHour(null)
    }

  };

  const idAct = id === undefined ? idActLs : id

  const handleClick = (hour) => {
    if (selectedHour === hour) {
      setSelectedHour(null);
    } else {
      setSelectedHour(hour);
      setReservation({
        ...reservation,
        hour: hour,
        date: selected,
        cost: cost,
        idActivity: idAct,
        idUser: idUser,
      })
    }
  };

  const getTileClassName = ({ date }) => {
    if (forbiddenDays.includes(capitalize(format(date, 'EEEE', { locale: es })))) {
      return styles.forbidden
    } else if (selectedDate && isSameDay(date, selectedDate.date)) {
      return styles.selected;
    }
    return '';
  };

  //Mercado Pago Funciones
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago(VITE_CREDENTIAL_SELLER)

  const createPreference = async () => {
    try {
      const response = await axios.post('http://localhost:3001/create_preference', {
        //const response = await axios.post('https://sportiverse-server.onrender.com/create_preference', {
        description: name,
        price: cost,
        quantity: 1
      })

      const { id } = response.data
      return id
    } catch (error) {
      console.log(error);
    }
  }

  const [showAlert, setShowAlert] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showAlertLog, setShowAlertLog] = useState(false);



  

  const handleBuy = async () => {
   
    if (loger === 'true') {
      const id = await createPreference();
      if (id) {
        localStorage.setItem('reservation', null);
        dispatch(postReservation(reservation));
        
        setPreferenceId(id)
        setShowAlert(true);
        setShowBackdrop(true);


      }
    } else {
      setShowAlertLog(true);
      setShowBackdrop(true);
    }
  }
  

  // useEffect(() => {
  //   const reservationIdFromLocalStorage = localStorage.getItem('reservation');
  //   setReservationId(reservationIdFromLocalStorage);
  // }, []);

  // const [reservationId, setReservationId] = useState(localStorage.getItem('reservation'))

  // let reservationParse = reservationId ? JSON.parse(reservationId) : null;

  // let idReservation = reservationParse?.id


  const handleCancelTransaction = () => {
    
    setTimeout(() => {
      
      const reservationIdFromLocalStorage = localStorage.getItem('reservation');
      let idReservation = null;
      if (reservationIdFromLocalStorage) {
        const reservationParse = JSON.parse(reservationIdFromLocalStorage);
        idReservation = reservationParse?.id;
      }
      setShowAlert(false);
      dispatch(deleteReservation(idReservation))
     
      setShowBackdrop(false);
      Swal.fire({
        icon: 'success',
        title: 'Reserva Cancelada',
        showConfirmButton: false,
        color: "#FFFFFF",
        background: "#666",
        timer: 3000,
        timerProgressBar: true
      });
    }, 1500);

  };

  const handleRenderWallet = () => {
    preferenceId && setShowWallet(true);

  };

  const handleClose = () => {
    setShowAlertLog(false);
    setShowBackdrop(false);
  }

  const handleRedirectLog = () => {
    const detailReservation = localStorage.getItem('detail');
    if (detailReservation) {
      localStorage.setItem('detail', null)
    }
    localStorage.setItem('detail', id)

    navigate('/login')
  }

  return (
    <div className={styles.containerGeneral}>
      <div >
        <Calendar onChange={handleDateChange} value={value} tileClassName={getTileClassName} />
        <h1 style={{ color: "white" }} className={styles.fechaSeleccionada}>
          ✔ Fecha seleccionada:{' '}
          {selectedDate
            ? `${selectedDate.dayName} ${format(selectedDate.date, 'dd/MM/yyyy', { locale: es })}`
            : 'Ninguna'}
        </h1>
      </div>
      <div>
        <div style={{ color: "white" }} className={styles.horarios}>
          {!selectedDate || selectedDate.dayName === "Fecha pasada" || selectedDate.dayName === "Día no válido" ? null :
            activity?.hours?.length > 0 ?
              (activity?.hours?.map((hour) => (
                <div key={hour}>
                  <button className={selectedHour === hour ? styles.selectedHour : styles.notSelected} value={hour} disabled={hoursReserved.includes(hour)} onClick={() => handleClick(hour)}>{hour} hs</button>
                </div>
              ))
              ) : (<p>Sin Horarios</p>)
          }
        </div>

        <div className={styles.reservar}>
          <button onClick={handleBuy} disabled={selectedHour === null} className={styles.reservarBtn}>Reservar</button>
        </div>



        {showAlert && (
          <div className={styles.popup}>
            <div className={styles.container}>
              <h2>✔ Datos de su reserva:</h2>
              <h4>Actividad: {capitalize(name)}</h4>
              <h4>Dia: {selectedDate.dayName}</h4>
              <h4>Hora: {selectedHour} hs</h4>
              <h4>Precio: ${cost}</h4>
            </div>
            <div className={styles.containerBtn}>
              <button className={styles.btnCancel} onClick={handleCancelTransaction}>Cancelar reserva</button>
              <button className={styles.btnCancel} onClick={handleRenderWallet} disabled={showWallet}>Continuar con Mercado Pago</button>
              {showWallet && <Wallet initialization={{ preferenceId }} />}

            </div>
          </div>
        )}

        {showAlertLog && (
          <div className={styles.popup}>
            <div className={styles.container}>
              <h2>Para realizar una reserva debes iniciar sesion</h2>
            </div>
            <div className={styles.containerBtn}>
              <button className={styles.btnCancel} onClick={handleRedirectLog}>Iniciar Sesion</button>
              <button className={styles.btnCancelarInicio} onClick={handleClose}>Cancelar</button>
            </div>
          </div>
        )}

        {showBackdrop && <div className={styles.backdrop} />}

      </div>
    </div>
  );
}
