import style from "./Landing.module.css";
import { NavLink } from "react-router-dom";
import imagen1 from "../../Components/Img/img1.jpg";
import imagen2 from "../../Components/Img/img2.jpg";
import imagen3 from "../../Components/Img/img3.jpg";
import imagen4 from "../../Components/Img/img4.png";
import logoBlanco from "../../assets/logo-shadow.png"

const Landing = () => {
  return (
    <div className={style.mainContainer}>
      {/* <HeaderSlider/> */}
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

  {
    /* <div className={style.navBar}></div>
            <div className={style.gridContainer}>
                <div className={style.textContainer}>
                    <h1>SPORTIVERSE</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, eius ipsa! Accusantium magni quidem ipsam error atque incidunt qui perspiciatis reprehenderit. Quasi alias, numquam eum optio quod doloribus illo voluptatum?</p>
                    <NavLink className={style.navlink} to={'/home'}>Busca tu actividad</NavLink>
                </div>
                <img src="https://www.touchtaiwan.com/images/default.jpg" alt="" className={style.principalImg}/>
                <div className={style.imgContainer}>
                    <img src="https://www.touchtaiwan.com/images/default.jpg" alt="" className={style.secondaryImg}/>
                    <img src="https://www.touchtaiwan.com/images/default.jpg" alt="" className={style.secondaryImg}/>
                    <img src="https://www.touchtaiwan.com/images/default.jpg" alt="" className={style.secondaryImg}/>
                </div>
            </div>
            <div className={style.footer}></div> */
  }
};

export default Landing;
