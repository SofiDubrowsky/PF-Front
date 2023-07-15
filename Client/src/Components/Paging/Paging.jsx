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
            <a className={style.flechita} onClick={() => paginado(currentPage - 1)}>←</a>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li key={number} className={style.li}>
            <a
              onClick={() => paginado(number)}
              className={`${style.pageNumber} ${
                number === currentPage ? style.selectedNumber : ""
              }`}
            >
              {number}
            </a>
          </li>
        ))}

        {currentPage < totalPages && (
          <li className={style.li}>
            <a className={style.flechita} onClick={() => paginado(currentPage + 1)}>→</a>
          </li>
        )}
      </ul>
    </nav>
  );
}