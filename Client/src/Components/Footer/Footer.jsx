import { NavLink } from "react-router-dom";
import instagram from '../../assets/instagram.png'
import facebook from '../../assets/facebook-circular-logo.png'
import style from '../Footer/Footer.module.css'


const Footer = () => {
    return (
      <div className={style.mainConatiner}>
          <NavLink to="/contact">Contacto</NavLink>
          <a 
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.enlaceRedes} src={instagram} alt="instagram" />
          </a> 
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.enlaceRedes} src={facebook} alt="facebook" />
          </a> 
      </div>
    )
}

export default Footer;