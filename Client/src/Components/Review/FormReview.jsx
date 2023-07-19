import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./Form.module.css";
import validate from "./validate";
import { postStore } from "../../redux/Actions/postStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";


const reload = () => {
  window.location.reload(false);
};

const FormReview = () => {
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
      if (Object.values(errorSave).length !== 0){
        Swal.fire({
          text: 'Debes completar todos los datos obligatorios',
          timerProgressBar: true
        })
      }
      else {
        dispatch(postStore(form));
        Swal.fire({
          text: 'Calificación enviada!',
          icon: 'success',
          showConfirmButton: true,
          showCancelButton: true, 
          confirmButtonText: 'Volver a mi perfil', 
          cancelButtonText: 'Volver al Inicio', 
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/dashboard')
            setTimeout(reload, 3000);  // Espera 3 segundos antes de llamar a reload()
          } else {
            navigate('/home');
          }
        })
        setForm({
          points: 0,
          description: '',
          userId: '',
          activityId: '', 
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

        <button className={style.btn} type="submit">
          Cerrar
        </button>
        
        
        <button className={style.btn} type="submit">
          Enviar
        </button>
        </div>

          </div>

      </form>
    </div>
  );
};

export default FormReview;

