import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux"
import style from "./Nav.module.css";
import logo from "../../assets/logo.png";

const Nav = () => {

  const access = useSelector((state) => state.access);
  const isClient = useSelector((state) => state.isClient);

  return (
    <div className={style.container}>
      <NavLink to="/home" className={style.navlink}>
        <div>
          <img src={logo} alt="logo" className={style.img} />
        </div>
      </NavLink>
      <NavLink to="/about" className={style.navlink}>
        Nosotros
      </NavLink>
      <NavLink to="/stores" className={style.navlink}>
        Sucursales
      </NavLink>
      {
        isClient?
        <></>:
        <NavLink to="/post" className={style.navlink}>
        Crear Actividad
        </NavLink>
      }
      
      <NavLink to="/login" className={style.navlink}>
        Iniciar Sesion/Registrarse
      </NavLink>
    </div>
  );
};
export default Nav;
