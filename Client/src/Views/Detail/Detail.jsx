import CalendarComponent from "../../Components/Calendar/Calendar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getActivityDetail } from "../../redux/Actions/getActivityDetail";
import { NavLink } from "react-router-dom";
import style from "./Detail.module.css";
import ReviewCarousel from "../../Components/ReviewCarousel/ReviewCarousel";

const Detail = () => {
  const { id } = useParams();
  const activity = useSelector((state) => state.detail);
  const reviews = activity?.reviews
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActivityDetail(id));
  }, [id]);

  // const storeName = activity.stores.map(store => store.name)[0];
  const renderStars = (numStars) => {
    const totalStars = 5;
    const fullStars = Math.min(Math.max(numStars, 0), totalStars);
    const starsArray = [];
    const roundedStars = Math.round(fullStars);
    for (let i = 0; i < roundedStars; i++) {
        starsArray.push(<img key={i} style={{ width: "2rem", height: "2rem" }} src={"https://tevispropane.com/wp-content/uploads/2016/11/Review-star.png"} alt="star" className={style.stars} />);
    }
    return <div className={style.starsContainer}>{starsArray}</div>;
};

  const calculateAverageStars = () => {
    if (!reviews || reviews.length === 0) return 0;

    const totalStars = reviews.reduce((sum, rev) => sum + (rev.points || 0), 0);
    const averageStars = totalStars / reviews.length;
    return averageStars;
};

  return (
    <div className={style.body}>

      <div className={style.contenedor}>
        <div className={style.sucursal}>
          <span>{activity?.name}</span>
        </div>
        <div className={style.image_info}>


          <div className={style.containerImage}>

            <img className={style.bigImage} src={activity?.picture} alt="activity" />

          </div>

          <div className={style.calendar}>
            <CalendarComponent />
            <h5 className={style.cost}>${activity?.cost}/hora</h5>
          </div>
        </div>
        <div className={style.description}>

          <div className={style.text}>
            <h3>Sucursal: </h3>
            <span>{activity?.stores?.map((store) => (store?.name).toUpperCase())}</span>
            <h3>Descripción: </h3>
            <span>{activity?.description}</span>
            {/*               <h3>Jugadores: </h3>
                <span>{activity?.players?.join(', ')}</span>
              <h3>Edad: </h3>
                <span>{activity?.age?.join(', ')}</span>
              <h3>Días: </h3>
                <span>{activity?.days?.join(', ')}</span>
              <h3>Hora: </h3>
              <span>{activity?.hours?.join('hs, ')}hs</span>*/}


          </div>

          <div class="flex flex-wrap justify-center items-center">
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-200 h-60 px-4 py-6 rounded-lg">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="text-verde-feo w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h3 class="text-white leading-relaxed">Jugadores</h3>
                <p class="title-font font-medium text-3xl text-white">{activity?.players?.join(', ')}</p>
              </div>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-200 h-60 px-4 py-6 rounded-lg">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="text-verde-feo w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h3 class="text-white leading-relaxed">Edades</h3>
                <p class="title-font font-medium text-3xl text-white">{activity?.age?.join(', ')}</p>
              </div>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-200 h-60 px-4 py-6 rounded-lg">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="text-verde-feo w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h3 class="text-white leading-relaxed">Dias</h3>
                <p class="title-font font-medium text-3xl text-white">{activity?.days?.join(', ')}</p>
              </div>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-200 h-60 px-4 py-6 rounded-lg">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="text-verde-feo w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h3 class="text-white leading-relaxed">Horarios</h3>
                <p class="title-font font-medium text-3xl text-white">{activity?.hours?.join('hs, ')}</p>
              </div>
            </div>
          </div>
<h2 className={style.h2special}>Opiniones de usuarios</h2>
<div className={style.average}>Calificacion promedio {Math.round(calculateAverageStars())}/5 {renderStars(calculateAverageStars())}</div>
        </div>
        <ReviewCarousel></ReviewCarousel>
      </div>

    </div>
  );
};

export default Detail;



