import React from 'react';
import stl from './Paging.module.css'


export default function Paging({ activitiesPerPage, allActivities, currpage, actualPage }) {


  const pageNumbers = [];
  const maxpage = Math.ceil(allActivities/ activitiesPerPage);

  for (let i = 0; i < maxpage; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className={stl.pagination}>
        {pageNumbers &&
          pageNumbers.map((num) => {
            return (
              <li className={stl.pagenr} key={num}>
                <a onClick={() => actualPage(num.toString())}>{num}</a>
              </li>
            );
          })}
        <span>{`   Page  ${currpage}`}</span>
      </ul>
    </nav>
  );
}