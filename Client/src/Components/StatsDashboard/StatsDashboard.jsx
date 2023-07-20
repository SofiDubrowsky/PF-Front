import style from "./StatsDashboard.module.css";
import { getReservations } from "../../redux/Actions/getReservations";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const StatsDashboard = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.allReservations);
  const [earningsPerStore, setEarningsPerStore] = useState({});
  const [reservationsPerStore, setReservationsPerStore] = useState({});
  const [paidReservations, setPaidReservations] = useState({})

  useEffect(() => {
    if (!reservations?.length) {
      dispatch(getReservations());
    }
    if (reservations?.length > 0) {
      setReservationsPerStore(getReservationsPerStore());
      console.log(reservationsPerStore);
      setEarningsPerStore(getReservationsPriceStore());
      console.log(earningsPerStore);
      setPaidReservations(getPaidReservations())
    }
  }, []);

  const getReservationsPerStore = () => {
    let reservationsPerStore = {};
    for (let i = 0; i < reservations?.length; i++) {
      if (!reservationsPerStore[reservations[i]?.activity?.stores[0]?.name]) {
        reservationsPerStore[reservations[i]?.activity?.stores[0]?.name] = 0;
      }
      reservationsPerStore[reservations[i]?.activity?.stores[0]?.name] += 1;
    }
    return reservationsPerStore;
  };

  const getReservationsPriceStore = () => {
    let reservationsPriceStore = {};
    for (let i = 0; i < reservations?.length; i++) {
      if (reservations[i]?.pay) {
        if (
          !reservationsPriceStore[reservations[i]?.activity?.stores[0]?.name]
        ) {
          reservationsPriceStore[reservations[i]?.activity?.stores[0]?.name] =
            reservations[i]?.activity?.cost;
        }
        reservationsPriceStore[reservations[i]?.activity?.stores[0]?.name] +=
          reservations[i]?.activity?.cost;
      }
    }
    return reservationsPriceStore;
  };

  const getPaidReservations = () => {
    let paidReservations = {
        paid: 0,
        notPaid: 0
    }
    for (let i = 0; i < reservations?.length; i++) {
        if(reservations[i]?.pay) paidReservations.paid += 1
        paidReservations.notPaid += 1
    }
    return paidReservations;
  }

  return (
    <div className={style.mainContainer}>
      <h1>Reservaciones por sucursal:</h1>
      <div className={style.graphContainer}>
        <Chart
          type="pie"
          data={{
            labels: Object.keys(reservationsPerStore),
            datasets: [
              {
                label: "# de reservaciones",
                data: Object.values(reservationsPerStore),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          }}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <h1>Reservaciones pagadas y no pagadas:</h1>
      <div className={style.graphContainer}>
        <Chart
          type="pie"
          data={{
            labels: ["Pagadas", "No pagadas"],
            datasets: [
              {
                label: "# de reservaciones",
                data: Object.values(paidReservations),
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          }}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <h1>Ganancias por sucursal:</h1>
      <div className={style.graphContainer}>
        <Chart
          type="pie"
          data={{
            labels: Object.keys(earningsPerStore),
            datasets: [
              {
                label: "# de reservaciones",
                data: Object.values(earningsPerStore),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          }}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default StatsDashboard;
