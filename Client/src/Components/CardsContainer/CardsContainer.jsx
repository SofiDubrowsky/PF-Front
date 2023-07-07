import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Card from "../Card/Card";
import Paging from "../Paging/Paging";
import SearchBar from "../../Components/SearchBar/SearchBar";
import {
  orderCost,
  filterByPlayers,
  filterByActivity,
} from "../../redux/Actions/filters";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {
  const dispatch = useDispatch();

  const activities = useSelector((state) => state.activities);
  const all = useSelector((state) => state.allActivities);

  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage, setactivitiesPerPage] = useState(4);
  const indexOfLastActivitie = currentPage * activitiesPerPage;
  const indexOfFirstActivitie = indexOfLastActivitie - activitiesPerPage;
  const currentActivities = activities.slice(
    indexOfFirstActivitie,
    indexOfLastActivitie
  );

  const [orden, setOrden] = useState("");
  const [cost, setCost] = useState("");
  const [players, setPlayers] = useState("");
  const [activity, setActivity] = useState("");

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const orderByName = (event) => {
    event.preventDefault();
    dispatch(orderCost(event.target.value));
    setCost(event.target.value);
    setOrden(event.target.value);
    // setCurrentPage(1);
  };

  const filterPlayers = (event) => {
    dispatch(filterByPlayers(event.target.value));
    setPlayers(event.target.value);
    setOrden(event.target.value);
    setCurrentPage(1);
  };

  const filterActivity = (event) => {
    dispatch(filterByActivity(event.target.value));
    setActivity(event.target.value);
    setOrden(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className={style.nav}>
        <div className={style.filtersContainer}>
          <div className={style.search}>
            <SearchBar />
          </div>
          <div className={style.filters}>
            <select onChange={(event) => orderByName(event)} value={cost}>
              <option value="" disabled hidden>
                Precio
              </option>
              <option value="ascendent">Menor Precio</option>
              <option value="descendent">Mayor Precio</option>
            </select>
          </div>
          <div className={style.filters}>
            <select onChange={(event) => filterPlayers(event)} value={players}>
              <option value="" disabled hidden>
                Jugadores
              </option>
              <option value="all">All</option>
              <option value="2-4">2 - 4</option>
              <option value="4-8">4 - 8</option>
              <option value="+8">+8</option>
            </select>
          </div>
          <div className={style.filters}>
            <select
              onChange={(event) => filterActivity(event)}
              value={activity}
            >
              <option value="" disabled hidden>
                Actividades
              </option>
              <option value="all">All</option>
              {all.map((activity) => (
                <option key={activity.id} value={activity.name}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={style.container}>
        {currentActivities?.map(
          ({ id, name, picture, cost, stores, players }) => {
            console.log(players);
            return (
              <Card
                key={id}
                id={id}
                picture={picture}
                name={name}
                cost={cost}
                stores={stores.map((element) => element.name)}
                players={players.map((player) => player)}
              />
            );
          }
        )}
      </div>
      <div>
        <Paging
          activitiesPerPage={activitiesPerPage}
          activities={activities.length}
          currentPage={currentPage}
          paginado={paginado}
        />
      </div>
    </div>
  );
};

export default CardsContainer;
