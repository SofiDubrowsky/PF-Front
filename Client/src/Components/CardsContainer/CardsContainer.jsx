import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Paging from "../Paging/Paging";
import SearchBar from "../../Components/SearchBar/SearchBar";
import {
  orderCost,
  allFilters,
  setFilters,
  setOrder,
} from "../../redux/Actions/filters";
import style from "./CardsContainer.module.css";
import { getStores } from "../../redux/Actions/getStores";

const CardsContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);

  const activities = useSelector((state) => state.activities);
  const allStores = useSelector((state) => state.stores);

  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage, setactivitiesPerPage] = useState(4);
  const indexOfLastActivitie = currentPage * activitiesPerPage;
  const indexOfFirstActivitie = indexOfLastActivitie - activitiesPerPage;
  const currentActivities = activities.slice(
    indexOfFirstActivitie,
    indexOfLastActivitie
  );

  const [cost, setCost] = useState("");

  const filtersSelected = useSelector((state) => state.filters);
  const orderSelected = useSelector((state) => state.order);

  const [storeFilter, setStoreFilter] = useState(
    filtersSelected.store
  );
  const [activityPlayers, setPlayersFilter] = useState(filtersSelected.players);
  const [activityAges, setAgesFilter] = useState(filtersSelected.ages);

  const handleFilterPlayers = (event) => {
    event.preventDefault();
    setPlayersFilter(event.target.value);
  };

  const handleFilterStore = (event) => {
    event.preventDefault();
    setStoreFilter(event.target.value);
  };

  const handleFilterAges = (event) => {
    event.preventDefault();
    setAgesFilter(event.target.value);
  };

  const handleFilter = () => {
    setCurrentPage(1);
    let filters = {
      players: activityPlayers,
      store: storeFilter,
      ages: activityAges,
    };
    dispatch(setFilters(filters));
    dispatch(allFilters(filters));
    setCost("");
  };

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const orderBy = (event) => {
    setCurrentPage(1);
    event.preventDefault();
    dispatch(setOrder(event.target.value));
    dispatch(orderCost(event.target.value));
    setCost(event.target.value);
  };

  return (
    <div className={style.background}>
      <div className={style.nav}>
        <div className={style.search}>
          <SearchBar />
        </div>
        <div className={style.filtersContainer}>
          <div className={style.filters}>
            <select onChange={(event) => orderBy(event)} value={orderSelected}>
              <option value="" disabled selected>
                Ordenar
              </option>
              <option value="ascendent">Menor Precio</option>
              <option value="descendent">Mayor Precio</option>
            </select>
          </div>
          <div className={style.filters}>
            <select onChange={handleFilterPlayers} value={activityPlayers}>
              <option value="all">Jugadores</option>
              <option value="2-4">2 - 4</option>
              <option value="4-8">4 - 8</option>
              <option value="+8">+8</option>
            </select>
          </div>

           <div className={style.filters}>
            <select
              onChange={(event) => handleFilterStore(event)}
              value={storeFilter}
            >
              <option value="all">Sucursales</option>
              {allStores.map((store) => (
                <option key={store.id} value={store.name}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          <div className={style.filters}>
            <select
              onChange={(event) => handleFilterAges(event)}
              value={activityAges}
            >
              <option value="all">Edades</option>
              <option value="Niños">Niños</option>
              <option value="Adultos">Adultos</option>
            </select>
          </div>

          {/* <button type="submit" onClick={handleFilter} className={style.btn}>
            Aplicar Filtros
          </button> */}
          <button type="submit" onClick={handleFilter}  className={style.btn}>APLICAR</button>
        </div>
      </div>

      <div className={style.container}>
        {currentActivities?.map(
          ({ id, name, picture, cost, stores, players, age }) => {
            return (
              <Card
                key={id}
                id={id}
                picture={picture}
                name={name}
                cost={cost}
                age={age}
                stores={stores?.map((element) => element.name)}
                players={players?.map((player) => player)}
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
