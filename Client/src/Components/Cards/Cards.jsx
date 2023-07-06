import style from "./Cards.module.css";
import { Card, } from "../index";
import { useState } from "react";

const Cards = () => {
    const activities = useState(state.activities)
    return(
        <div className={style.mainContainer}>
        {
        activities.map(
          ({ name, id, picture, stores, cost}) => {
            return (
               <Card
                key={id}
                id={id}
                name={name}
                picture={picture}
                stores={stores}
                cost={cost}
              />
            )
          }
        )
        }
        </div>
    )
}

export default Cards;