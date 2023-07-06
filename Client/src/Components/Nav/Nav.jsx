import { NavLink } from "react-router-dom";
import style from './Nav.module.css'

const Nav = () => {
    return (
      <div className={style.mainContainer}>
      <NavLink to="/home" className={style.logo}>Logo</NavLink>
      <NavLink to="/about">Nosotros</NavLink>
      <NavLink to="/post">Crear Actividad</NavLink>
      <NavLink to="">Iniciar Sesion/Registrarse</NavLink>
      <NavLink to="/">Salir</NavLink>
      </div>
    )
}
export default Nav;