import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./Form.module.css";
import validate from "./validate";
import { postStore } from "../../redux/Actions/postStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import { postReview } from "../../redux/Actions/postReview";


const reload = () => {
  window.location.reload(false);
};

const FormReview = ({handleClose, idUser, activityId, idReservation}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   dispatch(getStores());
  // }, [dispatch]);
  
  const [form, setForm] = useState({
    points: 0,
    description: '',
    userId: '',
    activityId: '', 
    reservationId: '',
  });
  
  const [errors, setErrors] = useState({});
  
  
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...form,
        [event.target.name]: event.target.value,
      })
      );
    };

    const handleRatingChange = (newRating) => {
      setForm({
        ...form,
        points: newRating,
        userId: idUser,
        activityId: activityId,
        reservationId: idReservation,
      });
      setErrors(
        validate({
          ...form,
          points: newRating,
        })
        );
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
      const errorSave = validate(form);
      if (Object.values(errorSave).length === 0){
        
        dispatch(postReview(form));
        handleClose()
        Swal.fire({
          title: '¡Calificación enviada!',
          text: '¡Gracias! Tu opinión nos ayuda a mejorar 🙌',
          icon: 'success',
          showConfirmButton: true,
          showCancelButton: true, 
          confirmButtonText: 'Volver a mi perfil', 
          cancelButtonText: 'Volver al Inicio', 
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/dashboard')
            reload()
          } else {
            navigate('/home');
          }
        })
        setForm({
          points: 0,
          description: '',
          userId: '',
          activityId: '', 
          reservationId: '',
        });
      }
      
  };


  return (
    <div className={style.contenedor}>

      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
      <h2>¿Como fue tu experiencia?</h2>
        <div className={style.allInputs}>
        
        <ReactStars
          count={5}
          value={form.points}
          size={50}
          onChange={handleRatingChange}
          color1="#cccccc"
          color2="#ffd700"
          half={false}
          className={style.contentt}
        />
         {errors.points && <p>{errors.points}</p>}

        <div className={style.content}>
          {/* <h3>Descripción: </h3> */}
          <textarea
            type="text"
            value={form.description}
            name="description"
            onChange={handleChange}
            placeholder="Danos tu opinión..."
            className={style.textareaForm}

            />
          {errors.description && <p>{errors.description}</p>}
        </div>
       

        
        <div className={style.contenttt}>

        <button className={style.btn} onClick={()=>{handleClose()}}>
          Cerrar
        </button>
        
        
        <button className={style.btn} type="submit" disabled={form.description === '' || form.points ===0}>
          Enviar
        </button>
        </div>

          </div>

      </form>
    </div>
  );
};

export default FormReview;

