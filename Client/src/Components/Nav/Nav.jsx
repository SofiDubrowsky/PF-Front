import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./Nav.module.css";
import logo from "../../assets/logo.png";
import { logout } from "../../redux/Actions/logout";


const Nav = () => {

  const dispatch = useDispatch();
  const access = localStorage.getItem("access")
  const isClient = localStorage.getItem("isClient");
  

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      window.location.href = "/home";
    });
  };

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
        isClient || isClient === undefined ?
        <></>:
        <NavLink to="/post" className={style.navlink}>
        Crear Actividad
        </NavLink>
      }

      {
        access ? 
        (<button className={style.logoutButton} onClick={handleLogout}>Cerrar sesión</button>):
        (<NavLink to="/login" className={style.navlink}>
        Iniciar Sesion
        </NavLink> )
      }
      
    </div>
  );
};
export default Nav;
