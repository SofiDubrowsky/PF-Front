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
            starsArray.push(<img key={i} style={{ width: "1.2rem", height: "1.2rem" }} src={"https://tevispropane.com/wp-content/uploads/2016/11/Review-star.png"} alt="star" className={style.star} />);
        }
        return <div className={style.starsContainer}>{starsArray}</div>;
    };

    return (      
        
          <div className={style.carouselContainer}>    
         
           <button className={style.controlButton} onClick={handlePrevPage} disabled={currentPage === 0}>{"<"}</button>
      
            {reviews?.slice(
              currentPage * reviewsPerPage,
              currentPage * reviewsPerPage + reviewsPerPage
            ).map((rev, index) => (
              <div key={index} className={style.contenedor}>
         
                    <div className={style.review}>
                        <div className={style.user}>
                            <img src={rev?.user?.picture} alt="User" />
                            <div className={style.name}>{rev?.user?.name} {renderStars(rev?.points)}</div>
                        </div>
                        
                        <div className={style.desc} >{rev?.description}</div>
                        <div className={style.date}> {(rev?.createdAt)?.split("T")[0]}</div>
                    </div>
                </div>
           ))}   
             
            <button className={style.controlButton} onClick={handleNextPage} disabled={currentPage >= Math.ceil(numReviews / reviewsPerPage) - 1}>{">"}</button>
         </div>
         
     );
   };
   
   export default ReviewCarousel;