import CalendarComponent from "../../Components/Calendar/Calendar"
import style from "./Detail.module.css"

const Detail = () => {
    return (
    <div>
        <div className={style.title}> 
            <h1>---Nombre de actividad---</h1>
        </div>

       
        <div  className={style.detailcontainer}> 
         <div className={style.containerImage}>
            <div className={style.bigImage}>contenedor de imagen</div>
            <div className={style.minimage}>
                <div className={style.image}>img1</div>
                <div className={style.image}>img2</div>
                <div className={style.image}>img3</div>  
            </div>
        </div>
        <div className={style.description}>
            <p>Esta es la informacion de la actividad traida del backend</p>
        </div>


         <div className={style.calendar}><CalendarComponent />       
           <button className={style.buyButton}>Reservar</button> 
           <button className={style.backButton}>volver</button></div> 
         </div>
    <hr/>
        <div className={style.review}><h2>Valoraciones de usuarios</h2>
            <div className={style.reviewbox}>-----Calificacion ☆☆☆☆☆ ------- "__________________________________________________________reseña#1__________________________________________________________________" -----Usuario-----</div>
        </div>

    </div>
    )
}

export default Detail;