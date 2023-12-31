import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import getActByName from "../../redux/Actions/getActByName";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleinputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getActByName(name));
    setName("");
  }

  return (
    <div className={style.principal}>
      <div className={style.inputSearch}>
        <input
          onChange={(e) => handleinputChange(e)}
          type="text"
          placeholder="Buscar actividad"
          value={name}
        />
        <div
          type="submit"
          onClick={handleSubmit}
          value="buscar"
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
    </div>
  );
}
