import style from "./Landing.module.css";
import { NavLink } from "react-router-dom";
import imagen1 from "../../Components/Img/img1.jpg";
import imagen2 from "../../Components/Img/img2.jpg";
import imagen3 from "../../Components/Img/img3.jpg";
import imagen4 from "../../Components/Img/img4.png";
import logoBlanco from "../../assets/logo-shadow-1.png";

const Landing = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.sliderFrame}>
        <ul>
          <li>
            <img src={imagen1} />
          </li>
          <li>
            <img src={imagen2} />
          </li>
          <li>
            <img src={imagen3} />
          </li>
          <li>
            <img src={imagen4} />
          </li>
        </ul>
      </div>

      <div className={style.title}>
        <img src={logoBlanco} alt="logo" />
      </div>
      <NavLink to="/home" className={style.navlink}>
        Busca tu actividad
      </NavLink>
    </div>
  );

};

export default Landing;
