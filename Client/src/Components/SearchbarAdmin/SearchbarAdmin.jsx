import style from "./SearchbarAdmin.module.css";

const SearchbarAdmin = () => {
  return (
    <div className={style.container}>

    <div className={style.principal}>
        <div className={style.inputSearch}>
          <input
            //   onChange={(e) => handleinputChange(e)}
            //   type="text"
            placeholder="Buscar por usuario"
            //   value={name}
          />
          <div
            //   type="submit"
            //   onClick={handleSubmit}
            //   value="buscar"
            className={style.icon}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#FFFFFF"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </div>
        </div>
        <div className={style.filtersContainer}>
          <div className={style.filters}>
            <select>
              <option value="" disabled selected>
                Actividades
              </option>
            </select>
          </div>
          <div className={style.filters}>
            <select>
              <option value="" disabled selected>
                Sucursal
              </option>
            </select>
          </div>
          <div className={style.filters}>
            <select>
              <option value="" disabled selected>
                Día
              </option>
            </select>
          </div>
          <div className={style.filters}>
            <select>
              <option value="" disabled selected>
                Hora
              </option>
            </select>
          </div>
          
        </div>
    </div>
    </div>
  );
};

export default SearchbarAdmin;
