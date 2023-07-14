// import React from 'react';
// import stl from './Paging.module.css'


// export default function Paging({ activitiesPerPage, allActivities, currpage, actualPage }) {


//   const pageNumbers = [];
//   const maxpage = Math.ceil(allActivities/ activitiesPerPage);

//   for (let i = 0; i < maxpage; i++) {
//     pageNumbers.push(i + 1);
//   }

//   return (
//     <nav>
//       <ul className={stl.pagination}>
//         {pageNumbers &&
//           pageNumbers.map((num) => {
//             return (
//               <li className={stl.pagenr} key={num}>
//                 <a onClick={() => actualPage(num.toString())}>{num}</a>
//               </li>
//             );
//           })}
//         <span>{`   Page  ${currpage}`}</span>
//       </ul>
//     </nav>
//   );
// }
import CardsContainer from "../CardsContainer/CardsContainer";
import style from "./Paging.module.css";

export default function Paginated({
  currentPage,
  activities,
  activitiesPerPage,
  paginado,
}) {
  const pageNumbers = [];
  const totalPages = Math.ceil(activities / activitiesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={style.ul}>
        {currentPage > 1 && (
          <li className={style.li}>
            <a onClick={() => paginado(currentPage - 1)}>←</a>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className={style.li}>
            <a
              onClick={() => paginado(number)}
              className={`${style.pageNumber} ${
                number === currentPage ? style[`colorNumber`] : ""
              }`}
            >
              {number}
            </a>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className={style.li}>
            <a onClick={() => paginado(currentPage + 1)}>→</a>
          </li>
        )}
      </ul>
    </nav>
  );
}