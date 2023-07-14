import CalendarComponent from "../../Components/Calendar/Calendar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getActivityDetail } from "../../redux/Actions/getActivityDetail";
import { NavLink } from "react-router-dom";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const activity = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivityDetail(id));
  }, [id]);

  // const storeName = activity.stores.map(store => store.name)[0];


  return (
    <div>
        <div className={style.sucursal}>
            <h3>Sucursal: <span>{activity?.stores?.map((store) => store.name)}</span></h3>
        </div>

    <div className={style.contenedor}>
        <div className={style.containerImage}>
          <img className={style.bigImage} src={activity?.picture} alt="activity"/>
        </div>
          {/* <div className={style.minimage}>
                <div className={style.image}>img1</div>
                <div className={style.image}>img2</div>
                <div className={style.image}>img3</div>  
            </div> */}

        <div className={style.description}>
            <div>

          <h2>{activity?.name}</h2>
            </div>
          <div className={style.text}>
            <h3>Descripción: <span>{activity?.description}</span></h3>
            <h3>Jugadores: <span>{activity?.players?.join(', ')}</span></h3>
            <h3>Edad: <span>{activity?.age?.join(', ')}</span></h3>
            <h3>Días: <span>{activity?.days?.join(', ')}</span></h3>
            <h3>Hora: <span>{activity?.hours?.join('hs, ')}hs</span></h3>
            <h5 className={style.cost}>${activity?.cost}<span>/hora</span></h5>
        </div>
      </div>

        <div className={style.calendar}>
          <CalendarComponent />
        </div>
    </div>
      
      <div className={style.review}>
        <h2>Valoraciones de usuarios</h2>
        <div className={style.reviewbox}>
          -----Calificacion ☆☆☆☆☆ -------
          "______________________________reseña#1______________________________"
          -----Usuario-----
        </div>
      </div>
    </div>
  );
};

export default Detail;
