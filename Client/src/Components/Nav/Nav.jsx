import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./Nav.module.css";
import logoBlanco from "../../assets/logo-shadow-1.png";
import { logout } from "../../redux/Actions/logout";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loger = localStorage.getItem("loger");
  const isClient = localStorage.getItem("isClient");

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/home");
    });
    localStorage.setItem("loger", false);
    localStorage.setItem("detail", null);
  };
  return (
    <div className={style.container}>
      <NavLink to="/home">
        <div>
          <img src={logoBlanco} alt="logo" className={style.img} />
        </div>
      </NavLink>
      <div className={style.navegacion}>
        <NavLink to="/about" className={style.navlink}>
          Nosotros
        </NavLink>
        <NavLink to="/stores" className={style.navlink}>
          Sucursales
        </NavLink>
        {/* {isClient === "false" && (
        <NavLink to="/post" className={style.navlink}>
          Crear Actividad
        </NavLink>
      )} */}
        {isClient === "true" && (
          <NavLink to="/dashboard" className={style.navlink}>
            Perfil Usuario
          </NavLink>
        )}
        {isClient === "false" && (
          <NavLink to="/admin" className={style.navlink}>
            Perfil Admin
          </NavLink>
        )}

        {loger === "true" ? (
          <NavLink  to="" className={style.navlink} onClick={handleLogout}>
            Cerrar Sesión
          </NavLink>
        ) : (
          <NavLink to="/login" className={style.navlink}>
            Inicia Sesión
          </NavLink>
        )}
      </div>
    </div>
  );
};
export default Nav;
