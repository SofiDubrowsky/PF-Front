import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from '../Home/Home.module.css';
import CardsContainer from '../../Components/CardsContainer/CardsContainer';
import getActivities from '../../redux/Actions/getActivities';
import Loader from '../../Components/Loader/Loader'


let Home = () => {
    const dispatch = useDispatch();
    const allActivities = useSelector((state) => state.allActivities)
    const activities = useSelector((state) => state.activities)
    const order = useSelector((state) => state.order)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        if(activities.length === allActivities.length && order === "" ){
            dispatch(getActivities());
        }
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(activities.length === allActivities.length && order === "" ){
                dispatch(getActivities()).then(() => {
                    setIsLoading(false);
                  });
            }
        }, 800);
    
        return () => clearTimeout(timer);
      }, [dispatch]);
    
      if (isLoading) {
        return (
          <div>
            <Loader/>
          </div>
        );
      }

    return (
        <div className={style.head}>
            {/*<h1>Sportiverse</h1>
            <h4>Ven y diviertete en grande</h4>*/}

            <CardsContainer/>
        
        </div>
    );
}



export default Home;