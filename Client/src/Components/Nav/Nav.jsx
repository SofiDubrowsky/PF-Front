import { NavLink } from "react-router-dom";
import style from './Nav.module.css'

const Nav = () => {
    return (
      <div className={style.container}>
      {/* <NavLink to="/home" className={style.navlink}>Landing</NavLink> */}
      <NavLink to="/about" className={style.navlink}>Nosotros</NavLink>
      <NavLink to="/post" className={style.navlink}>Crear Actividad</NavLink>
      <NavLink to="/home" className={style.navlink}>Iniciar Sesion/Registrarse</NavLink>
      <NavLink to="/" className={style.navlink}>Salir</NavLink>
      </div>
    )
}
export default Nav;