import style from "./UserDashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../redux/Actions/getUser";
import { getActivities } from "../../redux/Actions/getActivities";
import image from "../../assets/logo-blanco.png";
import { useState } from "react";
import UpdateUser from "../../Components/UpdateUser/UpdateUser";
import FormReview from "../../Components/Review/FormReview";
import { deleteReservation } from "../../redux/Actions/deleteReservations";
import { format } from 'date-fns-tz';
import Swal from "sweetalert2";
import axios from "axios";

const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(3);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const loger = localStorage.getItem('loger')
  const userDetail = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const idUser = localStorage.getItem("clientId");
  const activities = useSelector((state) => state.allActivities);
  const myReviews = userDetail?.reviews

  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showAlertLog, setShowAlertLog] = useState(false);
  const [showAlertReview, setShowAlertReview] = useState(false);
  const [showAlertCancel, setShowAlertCancel] = useState(false);

  const reload = () => {
    window.location.reload(false);
  };

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

  const editProfile = () => {
    setShowAlertLog(true);
    setShowBackdrop(true);
  }
  const addReview = (reservationId) => {
    setSelectedReservationId(reservationId);
    setShowAlertReview(true);
    setShowBackdrop(true);
  };
  const cancelation = (reservationId) => {
    console.log(reservationId);
    setSelectedReservationId(reservationId);
    setShowAlertCancel(true);
    setShowBackdrop(true);
  }
  const handleClose = () => {
    setShowAlertLog(false);
    setShowAlertReview(false);
    setShowAlertCancel(false);
    setShowBackdrop(false);
  }

  const totalPages = Math.ceil(reservations?.length / gamesPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const userPicture = (userDetail?.picture === null || userDetail?.picture === undefined) ? "https://img.freepik.com/free-icon/user_318-804790.jpg" : (userDetail?.picture)

//////////////////////////////////////////////
  const sendEmailData = async (emailInfo) => {
    try {
      const dataToSend = {
        reservId: emailInfo.reservId,
        activity: emailInfo.activity,
        date: emailInfo.date,
        hour: emailInfo.hour,
        cost: emailInfo.cost,
        user: emailInfo.user,
        store: emailInfo.store
      };

      await axios.post('http://localhost:3001/refund', dataToSend);
      // await axios.post('https://sportiverse-server.onrender.com/refund', emailInfo);
    // Mostrar la alerta de éxito
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error al enviar los datos por mail",
      text: "Revise que la direccion de correo elecotronico sea correcta",
      showConfirmButton: false,
      timer:3000,
      timerProgressBar: true,
    })
    // console.error('Error al enviar los datos por email:', error);
    
  }
};

  const handleDelete = (emailInfo) => {
    event.preventDefault();
    dispatch(deleteReservation(selectedReservationId));
    setShowAlertCancel(false);
    setShowBackdrop(false);
    sendEmailData(emailInfo);

    Swal.fire({
      icon: 'success',
      title: 'Reserva Cancelada',
      text: "Tu devolución impactará dentro de las proximas 48hs",
      showConfirmButton: true,
      confirmButtonText: 'Volver a mi perfil',
      color: "#FFFFFF",
      background: "#666",
    }).then((result) => {
      if (result.isConfirmed) {
        reload();  
      }
    })

  }

  const today = (format(new Date(), 'dd/MM/yyyy')).toString()

  return (
    <div className={style.user}>
      <div className={style.title}>
        <div className={style.imgBox}>
          <img className={style.img} src={userPicture} alt="https://img.freepik.com/free-icon/user_318-804790.jpg" />
        </div>
        <div className={style.data}>
          <img src={image} alt="" />
          <h1 style={{ color: "#9AC71F" }}>Usuario: {userDetail?.name}</h1>
          <h2>E-mail: {userDetail?.email}</h2>
          <h2>Telefono: {userDetail?.phone} </h2>
          <button className={style.btn} onClick={editProfile} disabled={loger !== 'true'}>Editar Datos</button>
          <button className={style.btn}>
            <NavLink to="/home" className={style.nav}> Volver </NavLink>
          </button>
        </div>
      </div>

      <div className={style.games}>
        <h1 className={style.reserva}>Mis Reservas </h1>
        <p style={{ color: "white", textAlign: "center", fontSize: "1.5rem" }}> Fecha Actual: {today}</p>
        <p style={{ color: "white", textAlign: "center", fontSize: "1rem" }}>*Recuerda que solo puedes cancelar con un día de anticipación.</p>
        <div className={style.pagination}>
          <button
            className={style.paginationButton}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}>
            <h1 >{"<"}</h1>
          </button>

          <h3 className={style.pag}>{`${currentPage}/${totalPages}`}</h3>

          <button
            className={style.paginationButton}
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}>
            <h1 >{">"}</h1>
          </button>
        </div>
        {currentGames?.length > 0 ? (
          currentGames?.map((reserv) => {
            const [day, month, year] = (reserv?.date?.split(" ").slice(1).join(" ").split("/"))
            const fechita = new Date(Number(year), Number(month) - 1, Number(day))
            const existsRes = myReviews?.map(rev => rev?.reservationId)
            const exist = existsRes?.includes(reserv?.id)

            const emailInfo={
              reservId:reserv?.id,
              activity:activities?.find((act) => act?.id === Number(reserv?.activityId))?.name?.toUpperCase(),
              date:reserv?.date,
              hour:reserv?.hour,
              cost:reserv?.cost,
              user:userDetail?.name,
              store:activities?.find((act) => act?.id === Number(reserv?.activityId))?.stores?.map((e) => e?.name)
            }
          
            return (
              <div className={style.gameContainer} key={reserv.id}>
                <div className={style.containerImage}>
                  <img
                    className={style.image}
                    src={
                      activities?.find(
                        (act) => act?.id === Number(reserv?.activityId)
                      )?.picture[0]
                    }
                    alt="notFound" />
                </div>

                <div className={style.containerData}>
                  <div className={style.data}>
                    <h3 style={{ color: "#9AC71F" }}>
                      Reserva:{" "}
                      {activities
                        ?.find((act) => act?.id === Number(reserv?.activityId))
                        ?.name?.toUpperCase()}
                    </h3>
                    <h4 style={{ fontSize: "1.5rem" }}>
                      Fecha: {reserv?.date}
                    </h4>
                    <h4 style={{ fontSize: "1.5rem" }}>
                      Turno: {reserv?.hour} hs
                    </h4>
                    <h4 style={{ fontSize: "1.2rem" }}>
                      Sucursal:{" "}
                      {activities
                        ?.find((act) => act?.id === Number(reserv?.activityId))
                        ?.stores?.map((e) => e.name)}
                    </h4>
                    <h4 style={{ fontSize: "1.2rem" }}>
                      ${" "}
                      {
                        activities?.find(
                          (act) => act?.id === Number(reserv?.activityId)
                        )?.cost
                      }
                    </h4>
                  </div>
                </div>
                <div className={style.buttons}>

                  {reserv?.pay === true ? (
                    <h3 style={{ color: "green", fontSize: "24px", marginBottom: "1rem" }}>Pago Aprobado ✔</h3>
                  ) : (
                    <h3 style={{ color: "red", fontSize: "24px", marginBottom: "1rem" }}>No Aprobado ❌</h3>
                  )}

                  {(fechita > new Date()) ? (<button className={style.btn} onClick={() => cancelation(reserv?.id)}>Cancelar Reserva</button>) : null}

                  {(fechita < new Date().setHours(0, 0, 0, 0)) ? (<button className={style.btn} onClick={() => addReview(reserv?.id)} disabled={existsRes.includes(reserv?.id)}>{existsRes.includes(reserv?.id) ? "Opinión Enviada ✔" : "Dejar Opinión ✉"} </button>) : null}

                  {showAlertReview && (
                    <div className={style.popupp}>
                      <FormReview handleClose={handleClose} idUser={idUser} activityId={reserv?.activityId} idReservation={selectedReservationId} />
                    </div>
                  )}

                {showAlertCancel && (
                  <div className={style.popup}>
                    <div className={style.container}>
                      <h2>CANCELACION DE RESERVA</h2>
                      <p>Recuerda que puedes cancelar tu reserva hasta el día anterior al turno</p>
                      <p style={{ fontSize: "1.5rem" }}>⚠︎ ¿Esta seguro de eliminar esta reserva? ⚠︎ </p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button className={style.btnCancel} onClick={() => handleDelete(emailInfo)}>Eliminar</button>
                      <button className={style.btnCancel} onClick={handleClose}>Volver</button>
                    </div>
                  </div>
                )}

                </div>
              </div>
            );
          })
        ) : (
          <h2 className={style.notFound}>No hay reservas por el momento</h2>
        )}



      </div>

      {showAlertLog && (
        <div className={style.popup}>
          <div className={style.container}>
            <h2>Editar Datos Personales</h2>
          </div>
          <div className={style.containerBtn}>
            <UpdateUser />
           <div style={{display:"flex",justifyContent:"center"}}><button className={style.btnCancel}  onClick={handleClose}>Cancelar</button></div> 
          </div>
        </div>
      )}




      {showBackdrop && <div className={style.backdrop} />}

    </div>
  );
};

export default UserDashboard;

