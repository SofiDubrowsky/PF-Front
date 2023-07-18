import style from './ActivitiesDashboard.module.css'
import { NavLink } from "react-router-dom";

const ActivitiesDashboard = () => {

    return(
        <div className={style.mainContainer}>
            <h1>Soy Actividades</h1>
            <div className={style.activity}>
      <NavLink to="/post">
        <button className={style.button} type="button">
          <span className={style.button__text}>Crear actividad</span>
          <span className={style.button__icon}>
            <svg
              className={style.svg}
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" x2="12" y1="5" y2="19"></line>
              <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
          </span>
        </button>
      </NavLink>
      </div>
      
        </div>
    )
}

export default ActivitiesDashboard;