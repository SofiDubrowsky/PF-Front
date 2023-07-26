import { useSelector } from "react-redux";
import { useState } from "react";
import style from './ReviewCarousel.module.css';

const ReviewCarousel = () => {
  const activity = useSelector((state) => state.detail);
  const reviews = activity?.reviews
  const numReviews = reviews?.length || 0;

  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 4;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };



  const renderStars = (numStars) => {
    const totalStars = 5;
    const fullStars = Math.min(Math.max(numStars, 0), totalStars);
    const starsArray = [];
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<img key={i} style={{ width: "1.2rem", height: "1.2rem" }} src={"https://tevispropane.com/wp-content/uploads/2016/11/Review-star.png"} alt="star" />);
    }
    return <div className={style.starsContainer}>{starsArray}</div>;
  };

  const [expandedReviews, setExpandedReviews] = useState({});

  // Función para manejar el clic en "ver más" o "ver menos" de una revisión específica
  const handleToggleText = (index) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (

    <div>

      {reviews?.length === 0 ? (
        <h3 style={{ margin: "2rem", fontSize: "2rem" , textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No hay opiniones aún</h3>
      )
        :
        (

          <div className={style.carouselContainer}>


            <button className={style.controlButton} onClick={handlePrevPage} disabled={currentPage === 0}>{"<"}</button>

            {reviews?.slice(
              currentPage * reviewsPerPage,
              currentPage * reviewsPerPage + reviewsPerPage
            ).map((rev, index) => (
                <div key={index} className={style.contenedor}>

                  <div className={style.review}>
                    <div className={style.user}>
                      <img src={ (rev?.user?.picture === null || rev?.user?.picture === undefined) ? "https://img.freepik.com/free-icon/user_318-804790.jpg" : (rev?.user?.picture)} alt="User" />
                      <div className={style.name}>{rev?.user?.name} {renderStars(rev?.points)}</div>
                    </div>

                    <div className={style.desc} > {expandedReviews[index]
                      ? rev?.description
                      : `${rev?.description?.length > 229
                          ? rev?.description?.slice(0, 229)
                          : rev?.description}`}
                      {rev?.description.length > 229 ? <button className={style.toggleButton} onClick={() => handleToggleText(index)}>
                      {expandedReviews[index] ? "...ver menos" : "...ver más"}
                      </button> : null}
                    </div>


                    <div className={style.date}> {(rev?.createdAt)?.split("T")[0]}</div>
                  </div>
                </div>
              )
            )}

            <button className={style.controlButton} onClick={handleNextPage} disabled={currentPage >= Math.ceil(numReviews / reviewsPerPage) - 1}>{">"}</button>
          </div>
        )}

    </div>



  );
};

export default ReviewCarousel;