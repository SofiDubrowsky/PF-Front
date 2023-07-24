import style from "./Admin.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getReservations } from "../../redux/Actions/getReservations";
import ReservationsDashboard from "../../Components/ReservationsDashboard/ReservationsDashboard";
import StatsDashboard from "../../Components/StatsDashboard/StatsDashboard";
import UserDashboard from "../../Components/UserDashboard/UserDashboard";
import ActivitiesDashboard from "../../Components/ActivitiesDashboard/ActivitiesDashboard";
import ConfigDashboard from "../../Components/ConfigDashboard/ConfigDashboard";
import StoresDashboard from "../../Components/StoresDashboard/StoresDashboard";
const Admin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isClient = localStorage.getItem("isClient");
  const reservations = useSelector((state) => state.allReservations);
  const [actualWindow, setActualWindow] = useState("stats");

  useEffect(() => {
    if (!reservations?.length) {
      dispatch(getReservations());
    }
  }, [])

  useEffect(() => {
    isClient !== "false" && navigate("/home");
  }, [isClient]);

  const handleClick = (data) => {
    event.preventDefault();
    setActualWindow(data);
  };

  return (
    <div className={style.gridContainer}>
      <div className={style.sideBar}>
        <div className={style.windowSelector}>
          <button
            className={style.windowButtton}
            onClick={() => handleClick("stats")}
            disabled={actualWindow === "stats"}
          >
            Estadísticas
          </button>
          <button
            className={style.windowButtton}
            onClick={() => handleClick("reservations")}
            disabled={actualWindow === "reservations"}
          >
            Reservas
          </button>
          <button
            className={style.windowButtton}
            onClick={() => handleClick("users")}
            disabled={actualWindow === "users"}
          >
            Usuarios
          </button>
          <button
            className={style.windowButtton}
            onClick={() => handleClick("activities")}
            disabled={actualWindow === "activities"}
          >
            Actividades
          </button>
          <button
            className={style.windowButtton}
            onClick={() => handleClick("stores")}
            disabled={actualWindow === "stores"}
          >
            Stores
          </button>
        </div>
        <button
          onClick={() => handleClick("config")}
          className={style.configButton}
          disabled={actualWindow === "config"}
        >
          Configuración
        </button>
      </div>
      <div className={style.adminWindow}>
        {(() => {
          switch (actualWindow) {
            case "stats":
              return <StatsDashboard />;

            case "reservations":
              return <ReservationsDashboard />;

            case "users":
              return <UserDashboard />;

            case "activities":
              return <ActivitiesDashboard />;

            case "stores":
              return <StoresDashboard />;

            case "config":
              return <ConfigDashboard />;

            default:
              break;
          }
        })()}
      </div>
    </div>
  );
};

export default Admin;
