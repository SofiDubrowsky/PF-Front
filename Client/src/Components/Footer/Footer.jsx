import { NavLink } from "react-router-dom";
import instagram from '../../assets/instagram.png'
import facebook from '../../assets/facebook-circular-logo.png'

const Footer = () => {
    return (
      <div>
          <NavLink to="/contact">Contacto</NavLink>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instagram} alt="instagram" />
          </a> 
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src={facebook} alt="facebook" />
          </a> 
      </div>
    )
}

export default Footer;