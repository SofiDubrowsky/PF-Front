import CalendarComponent from "../../Components/Calendar/Calendar"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect } from "react";
import { getActivityDetail } from "../../redux/actions/getActivityDetail";
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
            <h1>{activity?.name}</h1><h3>{activity?.stores}</h3>
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
            <p>Esta es la informacion de la actividad traida del backend {activity?.description}</p>
            <p>{activity?.players}</p>
            <p>{activity?.age}</p>
            <p>{activity?.days}</p>
            <p>{activity?.hours}</p>
            <h2>Reserva: ${activity?.cost}</h2>
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