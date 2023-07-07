import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = ({ name, id, picture, stores, cost, players}) => {
  return (
      <NavLink to={`/detail/${id}`}>
    <div className={style.container}>
        <h3 className={style.nameContainer}>{name}</h3>
        <img
          src={picture}
          alt={name}
          className={style.cardImg}
          />
      <h3 className={style.sucursalName}>{stores}</h3>
      <h5 className={style.priceTxt}>{cost}</h5>
      <h5>{players.map(player => player)}</h5>

    </div>
        </NavLink>
  );
};

export default Card;