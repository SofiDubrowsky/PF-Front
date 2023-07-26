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
  const [actualWindow, setActualWindow] = useState("reservations");

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

  const handleChange = (data) =>{
    handleClick(data);
    localStorage.setItem('preview', data)
  }

  useEffect(() => {
    let preview = localStorage.getItem('preview')
      handleClick(preview);
      localStorage.setItem('preview', "reservations")
  }, []);

  return (
    <div className={style.gridContainer}>
      <div className={style.sideBar}>
        <div className={style.windowSelector}>
          <button
            className={style.windowButtton}
            onClick={() => handleChange("reservations")}
            disabled={actualWindow === "reservations"}
          >
            Reservas
          </button>
          <button
            className={style.windowButtton}
            onClick={() =>handleChange("stats")}
            disabled={actualWindow === "stats"}
          >
            Estadísticas
          </button>
          <button
            className={style.windowButtton}
            onClick={() => handleChange("users")}
            disabled={actualWindow === "users"}
          >
            Usuarios
          </button>
          <button
            className={style.windowButtton}
            onClick={() => handleChange("activities")}
            disabled={actualWindow === "activities"}
          >
            Actividades
          </button>
          <button
            className={style.windowButtton}
            onClick={() => handleChange("stores")}
            disabled={actualWindow === "stores"}
          >
            Sucursales
          </button>
        </div>
        <button
          onClick={() => handleChange("config")}
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
