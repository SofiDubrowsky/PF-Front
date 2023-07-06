import CalendarComponent from "../../Components/Calendar/Calendar"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect } from "react";
import { getActivityDetail } from "../../redux/Actions/getActivityDetail";
import { NavLink } from "react-router-dom";
import style from "./Detail.module.css"

const Detail = () => {

    const {id} = useParams()
    const activity = useSelector(state=>state.detail)
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getActivityDetail(id))
    },[id]);



    return (
    <div>
        <div className={style.title}> 
            <h1>{activity?.name}</h1><h3>{activity?.store}</h3>
        </div>

        <div  className={style.detailcontainer}> 
         <div className={style.containerImage} >
            <img className={style.bigImage} src={activity?.picture} alt="activity"/>
            <div className={style.minimage}>
                <div className={style.image}>img1</div>
                <div className={style.image}>img2</div>
                <div className={style.image}>img3</div>  
            </div>
        </div>

        <div className={style.description}>
            <h3>Esta es la informacion de la actividad traida del backend {activity?.description}</h3>
            <h3>{activity?.players}</h3>
            <h3>{activity?.age}</h3>
            <h3>{activity?.days}</h3>
            <h3>{activity?.hours}</h3>
            <hr/>
            <h1>Reserva: ${activity?.cost}</h1>
        </div>


         <div className={style.calendar}><CalendarComponent />       
           <button className={style.buyButton}>Reservar</button> 
           <button className={style.backButton}><NavLink to="/home">Volver</NavLink></button>
         </div> 
        </div>
    <hr/>
        <div className={style.review}><h2>Valoraciones de usuarios</h2>
            <div className={style.reviewbox}>-----Calificacion ☆☆☆☆☆ ------- "__________________________________________________________reseña#1__________________________________________________________________" -----Usuario-----</div>
        </div>

    </div>
    )
}

export default Detail;