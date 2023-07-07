import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = ({ name, id, picture, stores, cost, players }) => {
  return (
    <NavLink to={`/detail/${id}`} className={style.navlink}>
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.sucursal}>
            <h3>{stores}</h3>
          </div>
          <div className={style.text}>
            <h3>{name}</h3>
          </div>
          <div className={style.img}>
          <img src={picture[0]} alt={name} className={style.cardImg} />
          </div>
          <div className={style.content}>
            <h5>${cost} /hora</h5>
            <h5>Jugadores: {players.map((player) => player)}</h5>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
