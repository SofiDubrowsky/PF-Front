import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from '../Home/Home.module.css';
import CardsContainer from '../../Components/CardsContainer/CardsContainer';
import getActivities from '../../redux/Actions/getActivities';


let Home = () => {
    const dispatch = useDispatch();
    const allActivities = useSelector((state) => state.allActivities)
    const activities = useSelector((state) => state.activities)
    const order = useSelector((state) => state.order)
    
    useEffect(() => {
        if(activities.length === allActivities.length && order === "" ){
            dispatch(getActivities());
        }
    }, [dispatch]);

    return (
        <div className={style.head}>
            {/*<h1>Sportiverse</h1>
            <h4>Ven y diviertete en grande</h4>*/}
        
            <CardsContainer/>
        
        </div>
    );
}



export default Home;