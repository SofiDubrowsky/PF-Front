import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = ({ name, id, imagen, sucursal, precio}) => {
  return (
      <NavLink to={`/detail/${id}`}>
    <div className={style.container}>
        <h3 className={style.nameContainer}>Football</h3>
        <img
          src='https://recreadeportiva.mx/wp-content/uploads/2017/04/Reynosa-Tec.jpg'
          alt={name}
          className={style.cardImg}
          />
      <h3 className={style.sucursalName}>Centro</h3>
      <h5 className={style.priceTxt}>Precio: $400</h5>

    </div>
        </NavLink>
  );
};

export default Card;