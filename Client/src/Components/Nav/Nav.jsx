import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
      <div>
      <NavLink to="">Iniciar Sesion/Registrarse</NavLink>
      <NavLink to="/">Salir</NavLink>
      <NavLink to="/post">Crear Actividad</NavLink>
      <NavLink to="/about">Nosotros</NavLink>
      <NavLink to="/home">Logo</NavLink>
      </div>
    )
}

export default Nav;