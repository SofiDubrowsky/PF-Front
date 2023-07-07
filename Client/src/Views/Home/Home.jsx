import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from '../Home/Home.module.css';
import CardsContainer from '../../Components/CardsContainer/CardsContainer';
import getActivities from '../../redux/Actions/getActivities';


let Home = () => {
    const dispatch = useDispatch();
    // let allActivities = useSelector((state) => state.activities);
    // const allplayers = useSelector((state) => state.players);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [activitiesPerPage, setActivitiesPerPage] = useState(6);
    // const lastActivitiIndex = currentPage * activitiesPerPage;
    // const firstActivitiIndex = lastActivitiIndex - activitiesPerPage;
    // const currentActivities = allActivities.slice(firstActivitiIndex, lastActivitiIndex);
    // const [render, setRender] = useState('');

    // Get Activities from DB 
    useEffect(() => {
      dispatch(getActivities());
    }, [dispatch]);

    //Get Ages from DB 
    // useEffect(() => {
    //     dispatch(getAges());
    // }, [dispatch])

    //Get Players from DB
    // useEffect(() => {
    //     dispatch(getPlayers());
    // }, [dispatch])

    // const handleOrderByName = (event) => {
    //     event.preventDefault();
    //     dispatch(orderName(event.target.value))
    //     setCurrentPage(1)
    // }

    // function handleAgeFilter(e) {
    //     e.preventDefault();
    //     //dispatch(ageFilter(e.target.value));
    //     setCurrentPage(1);
    // }

    // function handlePlayerFilter(e) {
    //     e.preventDefault();
    //     //dispatch(playerFilter(e.target.value));
    //     setCurrentPage(1);
    // }

    // function handleOriginFilter(e) {
    //     //dispatch(actOrigin(e.target.value));
    //     setCurrentPage(1);
    // }

    // function handleShowAll(e) {
    //     //dispatch(actOrigin('All'));
    //     //dispatch(sortActivities('asc'));
    //     setCurrentPage(1);
    // }

    // function handleSortActivities(e) {
    //     e.preventDefault();
    //     //dispatch(sortActivities(e.target.value));
    //     setRender(`Order ${e.target.value}`);
    //     setCurrentPage(1);
    // }

    // Verifico si allActivities es un arreglo antes de llamar a sort()
    // if (Array.isArray(allActivities)) {
    //     allActivities.sort();
    // } else {
    //     return allActivities = [];
    // }

    return (
        <div className={style.head}>
            <h1>Sportiverse</h1>
            <h4>Ven y diviertete en grande</h4>
        {/*Buscador*/}
            <CardsContainer/>
        {/*Todas las actividades*/}
            {/* <div className={stl.c2}>
                <div>
                    <button className={stl.hpbot} onClick={handleShowAll}>
                        Todas las actividades
                    </button>
                </div> */}
        {/* Sucursales*/}
        {/* <div>
        <select className={stl.hpfilter} onChange={handleOriginFilter}>
            <option value="All"> Todas las sucursales</option>
           <option value="DBROSAS">Actividades Cerro de las Rosa </option>
            <option value="DBCENTRO">Actividades Centro </option>
            <option value="DBJARDIN">Actividades Barrio Jardin </option>
        </select>
    </div> */}

        {/*Edades*/}
                {/* <div>
                    <select className={stl.hpfilter} onChange={handleAgeFilter}>
                        allages.sort().map((e) => {
                            return <option value={e}>{e}</option>;
                        })
                    </select>
                </div> */}
        {/*Jugadores*/}
                {/* <div>
                    <select className={stl.hpfilter} onChange={handlePlayerFilter}>
                        allplayers.sort().map((e) => {
                            return <option value={e}>{e}</option>;
                        })
                    </select>
                </div> */}
        {/*Ordenar*/}
                {/* <div>
                    <select
                        className={stl.hpfilter}
                        onChange={handleOrderByName}
                        onBlur={handleSortActivities}
                    >
                        <option value="asc">Ordenar</option>
                        <option value="asc">Asecendente</option>
                        <option value="desc">Desendente</option>
                        <option value="valoration">Valoración</option>
                        <option value="price">Precio</option>
                    </select>
                </div> */}
            {/* <div >
                <select
                onChange={(event) => handleOrderByName(event)}
                // value={nameFilter}
                >
                <option value="" disabled hidden>
                    Order
                </option>
                <option value="ascendent">A - Z</option>
                <option value="descendent">Z - A</option>
                </select>
            </div> */}
        {/*Inicio*/}
                {/* <Link to="/">
                    <button className={stl.hpbot}>Inicio</button>
                </Link>
            </div> */}
        {/*Paginado*/}
            {/* { <div className={stl.c4}>
                <Paging
                    activitiesPerPage={activitiesPerPage}
                    allActivities={allActivities.length}
                    currpage={currentPage}
                    actualPage={setCurrentPage}
                />
            </div> }
            <div>
                <Filters setCurrentPage={setCurrentPage}/>
            </div> */}
        {/*Valor no existe*/}
        {/* <Card></Card> */}
            {/* <div className={stl.c5}>
                {Array.isArray(currentActivities) ? (
                    currentActivities.map((p) => (
                        <Fragment key={p.id}>
                            <Link to={`/activities/${p.id}`}>
                                <Card 
                                name={p.name} picture={p.picture} />
                            </Link>
                        </Fragment>
                    ))
                ) : (
                    <h3>Actividad no encontrada</h3>
                )}
            </div> */}
            {/* <div className={stl.cardsContainer}>
            {currentActivities?.map(
          ({
            id,
            name,
            picture,
            cost,
            stores
          }) => {
            return (
              <Card
                key={id}
                id={id}
                picture={picture}
                name={name}
                cost={cost}
                stores={stores.map(element => element.name)}
              />
            );
          }
        )}
            </div> */}
        </div>
    );
}



export default Home;