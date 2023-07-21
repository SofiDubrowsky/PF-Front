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
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [reservationsPerStore, setReservationsPerStore] = useState({});
  const [totalReservation, setTotalReservatios] = useState(0);
  const [paidReservations, setPaidReservations] = useState({});
  const [reservationsPerMonth, setReservationsPerMonth] = useState([]);

  useEffect(() => {
    if (!reservations?.length) {
      dispatch(getReservations());
    }
    if (reservations?.length > 0) {
      setReservationsPerStore(getReservationsPerStore());
      setEarningsPerStore(getReservationsPriceStore());
      setPaidReservations(getPaidReservations());
      setTotalEarnings(getTotalEarnings());
      setTotalReservatios(getTotalReservations());
      setReservationsPerMonth(getReservationsPerMonth());
    }
  }, []);

  const getReservationsPerMonth = () => {
    let result = {
      "/01": 0,
      "/02": 0,
      "/03": 0,
      "/04": 0,
      "/05": 0,
      "/06": 0,
      "/07": 0,
      "/08": 0,
      "/09": 0,
      "/10": 0,
      "/11": 0,
      "/12": 0,
    };
    let resultArray = [];
    for (let i = 0; i < reservations.length; i++) {
      let index = reservations[i].date.indexOf("/");
      result[reservations[i].date.slice(index, index + 3)] += 1;
    }

    for (const month in result) {
      resultArray.push(result[month]);
    }

    console.log(result);
    console.log(resultArray);
    return resultArray;
  };

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

  const getTotalReservations = () => {
    let total = 0;
    for (let i = 0; i < reservations.length; i++) {
      total += 1;
    }

    return total;
  };

  const getTotalEarnings = () => {
    let total = 0;

    for (const store in earningsPerStore) {
      total += earningsPerStore[store];
    }

    return total;
  };

  const getReservationsPriceStore = () => {
    let reservationsPriceStore = {};
    for (let i = 0; i < reservations?.length; i++) {
      if (reservations[i]?.pay === true) {
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
      notPaid: 0,
    };
    for (let i = 0; i < reservations?.length; i++) {
      if (reservations[i]?.pay) paidReservations.paid += 1;
      if (!reservations[i]?.pay) paidReservations.notPaid += 1;
    }
    return paidReservations;
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.graphReservationsPerStore}>
        <h3 className={style.title}>Reservaciones por sucursal:</h3>
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
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className={style.dataTable}>
          {Object.keys(reservationsPerStore).map((key) => {
            return (
              <p>
                {key}: {reservationsPerStore[key]}
              </p>
            );
          })}
        </div>
        <div className={style.total}>
          <p>Total de reservas: {totalReservation}</p>
        </div>
      </div>

      <div className={style.graphReservationsPaid}>
        <h3 className={style.title}>Reservaciones pagadas y no pagadas:</h3>
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
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className={style.dataTable}>
          <p>Pagado: {paidReservations.paid}</p>
          <p>No pagado: {paidReservations.notPaid}</p>
        </div>
        <div className={style.total}>
          <p>Total de reservas: {totalReservation}</p>
        </div>
      </div>

      <div className={style.graphEarnings}>
        <h3 className={style.title}>Ganancias por sucursal:</h3>
        <div className={style.graphContainer}>
          <Chart
            type="pie"
            data={{
              labels: Object.keys(earningsPerStore),
              datasets: [
                {
                  label: "Total den pesos",
                  data: Object.values(earningsPerStore),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className={style.dataTable}>
          {Object.keys(earningsPerStore).map((key) => {
            return (
              <p>
                {key}: ${earningsPerStore[key]}
              </p>
            );
          })}
        </div>
        <div className={style.total}>
          <p>Ganancias totales: ${totalEarnings}</p>
        </div>
      </div>
      <div className={style.graphPerMonth}>
        <h3 className={style.title}>Ganancias por sucursal:</h3>
        <div className={style.graphContainer}>
          <Chart
            type="line"
            data={{
              labels: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
              ],
              datasets: [
                {
                  label: "",
                  data: reservationsPerMonth,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className={style.dataTable}>
          <p>Enero: {reservationsPerMonth[0]}</p>
          <p>Febrero: {reservationsPerMonth[1]}</p>
          <p>Marzo: {reservationsPerMonth[2]}</p>
          <p>Abril: {reservationsPerMonth[3]}</p>
          <p>Mayo: {reservationsPerMonth[4]}</p>
          <p>Junio: {reservationsPerMonth[5]}</p>
          <p>Julio: {reservationsPerMonth[6]}</p>
          <p>Agosto: {reservationsPerMonth[7]}</p>
          <p>Septiembre: {reservationsPerMonth[8]}</p>
          <p>Octubre: {reservationsPerMonth[9]}</p>
          <p>Noviembre: {reservationsPerMonth[10]}</p>
          <p>Diciembre: {reservationsPerMonth[11]}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
