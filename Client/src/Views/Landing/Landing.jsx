import style from "./Landing.module.css";
import { NavLink } from "react-router-dom";
import imagen1 from "../../Components/Img/img1.jpg";
import imagen2 from "../../Components/Img/img2.jpg";
import imagen3 from "../../Components/Img/img3.jpg";
import imagen4 from "../../Components/Img/img4.png";
import logoBlanco from "../../assets/logo-shadow-1.png";
import { useState } from "react";
import { useEffect } from "react";

const Landing = () => {

  
  
  const Texto1 = {title:"Misión",text:"Mediante nuestras instalaciones, crear un espacio que promueva el bienestar y ofrecer servicios de calidad en actividades sociales y deportivas, fomentando la convivencia, la salud y el entretenimiento.",
  img: "http://localhost:3000/src/assets/images/paintball.png"}
  const Texto2 = {title:"Visión" ,text:"Convertirnos en un referente a nivel nacional de entornos que promuevan el bienestar físico, emocional y social. Ser reconocidos e inspirar un estilo de vida saludable, donde cada visita se convierta en una experiencia memorable."
 ,img:"http://localhost:3000/src/assets/images/paddel.png"}

 const PromoA = {title:"Nuevas Actividades!",text:"Prueba nuestras nuevas actividades! Hemos sumado Airsoft y Paintball a nuestras actividades disponibles, disfruta del combate entre equipos y pon a prueba tus habilidades!"
 ,img:"https://images.squarespace-cdn.com/content/v1/5859d201ff7c50b1564c992f/1584669795040-DDMKDIM6A0824G04RAAC/image-asset.jpeg?format=1000w"}

 const PromoB = {title:"Rápido y Fácil!",text:"Gracias al nuevo sistema de reservas virtuales, puedes encontrar tu turno y reservarlo rápidamente! Entra ahora y reserva tu próxima partida, selecciona el horario que te quede mejor!"
 ,img:"https://c1.wallpaperflare.com/preview/505/551/770/calendar-date-time-month.jpg"}





  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentTextInd, setCurrentTextInd] = useState(0);

  useEffect(() => {
    // Cambiar el índice del texto cada 10 segundos
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
      setCurrentTextInd((prevInd) => (prevInd === 0 ? 1 : 0));
    }, 11000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  const getTextToShow = () => {
    return currentTextIndex === 0 ? <div  className={style.textContainer}><img src={Texto1.img} alt="" /><div className={style.text}><h2>{Texto1.title}</h2><p>{Texto1.text}</p></div></div> : <div  className={style.textContainer}><img src={Texto2.img} alt="" /><div className={style.text}><h2>{Texto2.title}</h2><p>{Texto2.text}</p></div></div> ;
  };

  const getPromoToShow = () => {
    return currentTextInd === 0 ? <div  className={style.textContainerb}><img src={PromoA.img} alt="" /><div className={style.text}><h2>{PromoA.title}</h2><p>{PromoA.text}</p></div> </div> : <div  className={style.textContainerb}><img src={PromoB.img} alt="" /><div  className={style.text}><h2>{PromoB.title}</h2><p>{PromoB.text}</p></div></div> ;
  };
  
  return (
    <div className={style.mainContainer}>
      <div className={style.barr}> <div><img src="https://cdn-icons-png.flaticon.com/512/147/147243.png" alt="" style={{height:"4.5rem",marginBottom:"1.3rem"}}/> <p>Alquiler para</p> <p>Actividades Deportivas</p></div> 
      <div><img src="https://www.hangtimemedia.com/wp-content/uploads/2018/06/location-icon-png-3.png" alt="" style={{height:"6rem",marginBottom:".4rem"}}/> <p>Sucursales en</p><p>Córdoba Argentina</p></div>
      <div><img src="https://aguerrea.com.ar/wp-content/uploads/elementor/thumbs/mercado-pago-gris-p8x74l49a8gcnhn784eehg0lm9lq0ld6ix6hsur83g.png" alt="" style={{height:"7rem"}}/><p>Pagos Online con</p><p>Mercado Pago</p></div></div>
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
      <div className={style.bar}> {getPromoToShow()} {getTextToShow()}</div>
      
    </div>
  );

};

export default Landing;
