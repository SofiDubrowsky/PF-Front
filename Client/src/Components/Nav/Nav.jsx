import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./Nav.module.css";
import logo from "../../assets/logo.png";
import { logout } from "../../redux/Actions/logout";


const Nav = () => {

  const dispatch = useDispatch();
  const loger = localStorage.getItem('loger')
  console.log(loger);
  const isClient = localStorage.getItem("isClient");
  

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      window.location.href = "/home";
    });
    localStorage.setItem('loger', false)
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
        isClient === 'false' && <NavLink to="/post" className={style.navlink}>
        Crear Actividad
        </NavLink>
        } 
        {isClient === 'true' && <NavLink to='/dashboard' className={style.navlink}>Perfil de Usuario</NavLink>}
        {isClient === 'false' && <NavLink to='/admin' className={style.navlink}>Perfil del Admin</NavLink> }

      
       {loger === 'true' ? <button className={style.logoutButton} onClick={handleLogout}>Cerrar sesión</button> :
       <NavLink to="/login" className={style.navlink}>
        Iniciar Sesion
        </NavLink>
       }
       
      
    
    </div>
  );
};
export default Nav;
