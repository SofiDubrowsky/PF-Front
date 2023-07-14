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


export default function CalendarComponent() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const activity = useSelector((state) => state.detail);
  const idUser = useSelector((state) => state.clientId);
  let selected = selectedDate ? `${selectedDate.dayName} ${format(selectedDate.date, 'dd/MM/yyyy', { locale: es })}` : null
  const dayReservations = activity?.reservations?.find(reserv => reserv.date === selected)
  const id = activity?.id
  const cost = activity?.cost
  const name = activity?.name

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
        idActivity: id,
        idUser: 1,
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
  initMercadoPago('APP_USR-f77b254e-b7df-4f4e-9da7-82b3a2e8be04')

  const createPreference = async () => {
    try {
      const response = await axios.post('http://localhost:3001/create_preference', {
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

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      dispatch(postReservation(reservation));
      setPreferenceId(id)
      setShowAlert(true);
      setShowBackdrop(true);
    }
  }

  const reservationLs = localStorage.getItem('reservation');

  const reservationParse = reservationLs ? JSON.parse(reservationLs) : null;

  const idReservation = reservationParse?.id

  const deleteReservation = async () => {
    try {
      if (idReservation) {
        await axios.delete(`http://localhost:3001/reservations/${idReservation}`);
        Swal.fire({
          icon: 'success',
          title: 'Reserva cancelada',
          timer: 2000,
          timerProgressBar: true
        });
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar la reserva',
        text: error.message,
      });
    }
  };

  const handleCancelTransaction = () => {
    setShowAlert(false);
    deleteReservation();
    setShowBackdrop(false); //nuevo
  };

  const handleRenderWallet = () => {
    preferenceId && setShowWallet(true);

  };

  // useEffect(() => {
  //   localStorage.setItem('reservation', JSON.stringify(reservation));
  // }, [reservation]);


  return (
    <div >
      <div className={styles['calendar-container']}>
        <Calendar onChange={handleDateChange} value={value} tileClassName={getTileClassName} />
        <p style={{ color: "white" }} className={styles.fechaSeleccionada}>
          ✔ Fecha seleccionada:{' '}
          {selectedDate
            ? `${selectedDate.dayName} ${format(selectedDate.date, 'dd/MM/yyyy', { locale: es })}`
            : 'Ninguna'}
        </p>
      </div>
      <div>
        <div style={{ color: "white" }} className={styles.horarios}>
          {!selectedDate || selectedDate.dayName === "Fecha pasada" || selectedDate.dayName === "Día no válido" ? null :
            activity?.hours?.length > 0 ?
              (activity?.hours?.map((hour) => (
                <div key={hour}>
                  <button className={selectedHour === hour ? styles.selected : styles.notSelected} value={hour} disabled={dayReservations?.hour === hour} onClick={() => handleClick(hour)}>{hour} hs</button>
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
              <button className={styles.btnConfirm} onClick={handleRenderWallet} disabled={showWallet}>Continuar con Mercado Pago</button>
              {showWallet && <Wallet initialization={{ preferenceId }} />}

            </div>
          </div>
        )}

        {showBackdrop && <div className={styles.backdrop} />}

      </div>
    </div>
  );
}