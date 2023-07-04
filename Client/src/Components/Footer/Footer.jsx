import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
      <div>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contacto</NavLink>
      </div>
    )
}

export default Footer;