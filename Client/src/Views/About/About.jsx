import React, { useState, useEffect } from "react";
import style from "./About.module.css";
import img1 from "../../assets/images/paintball.png";
import img2 from "../../assets/images/futbol.png";
import img3 from "../../assets/images/paddel.png";
// import mision from "../../assets/mision.png";
// import vision from "../../assets/vision.png";

const About = () => {
  const [currentImage, setCurrentImage] = useState(img1);
  const [imageIndex, setImageIndex] = useState(0);
  const images = [img1, img2, img3];


  const changeImage = (image) => {
    setCurrentImage(image);
    setImageIndex(images.indexOf(image));
  };


  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (imageIndex + 1) % images.length;
      setCurrentImage(images[newIndex]);
      setImageIndex(newIndex);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [imageIndex, images]);

  return (
    <div>
      <div>
        <h1 className={style.ab}>Nuestro proposito</h1>
      </div>

      <div className={style.aboutContainer2}>
        <div className={style.containerImage}>
          <div className={style.bigImage}>
            <img
              src={currentImage}
              alt="Imagen grande"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "17px" }}
            />
          </div>
          <div className={style.minimage}>
            {images.map((image, index) => (
              <div
                key={index}
                className={style.image}
                onClick={() => changeImage(image)}
              >
                <img src={image} alt={`Imagen ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className={style.description}>
          <h1 className={style.h1}>Misión</h1>
          <p className={style.text}>
            En el complejo deportivo Sportiverse, nuestra misión es crear un
            espacio acogedor y amigable que promueva el bienestar y la diversión
            para nuestros usuarios y sus familias. Nos esforzamos por ofrecer
            servicios de calidad en actividades sociales y deportivas, fomentando
            la convivencia, la salud y el entretenimiento. Nuestro compromiso se
            basa en la integridad y respeto.
          </p>
          <hr />
          <h1 className={style.h1}>Visión</h1>
          <p className={style.text}>
            Nos visualizamos como un lugar excepcionalmente acogedor, donde el
            bienestar y la diversión sean los pilares fundamentales. Buscamos
            convertirnos en un referente a nivel local e nacional en la creación
            de un entorno que promueva el bienestar físico, emocional y social de
            nuestros usuarios y sus familias. A través de la excelencia en nuestros
            servicios, instalaciones modernas y accesibles, nos esforzamos por ser
            reconocidos como un complejo deportivo y social que inspire un estilo
            de vida saludable y lleno de alegría.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;