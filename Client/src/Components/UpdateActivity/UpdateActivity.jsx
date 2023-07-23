import style from "./UpdateActivity.module.css";
// import validate from "../../Views/Form/validate";
import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { updateActivity } from "../../redux/Actions/updateActivity";
import { getActivities } from "../../redux/Actions/getActivities";
import { getStores } from "../../redux/Actions/getStores";
import { useDispatch, useSelector } from "react-redux";

const UpdateActivity = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({})
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState("");
  const allActivities = useSelector((state) => state.activities);
  const allStores = useSelector((state) => state.stores);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name] : event.target.value
    })
  }

  const handleSelect = (event) => {
    setForm({
      ...form,
      [event.target.name] : event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateActivity())
  }
  return (
    <div>
      <form
        className={style.formContainer}
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className={style.allInputs}>
          <div className={style.content}>
            <input
              type="text"
              value={form.name}
              name="name"
              onChange={(event) => handleChange(event)}
              placeholder="Nombre"
              className={style.inputForm}
            />
            {/* {errors.name && <p>{errors.name}</p>} */}
          </div>
          <div className={style.content}>
            {/* <h3>Precio: $</h3> */}
            <input
              type="number"
              min="0"
              value={form.cost}
              name="cost"
              onChange={handleChange}
              placeholder="Precio"
              className={style.inputForm}
            />
            {/* {errors.cost && <p>{errors.cost}</p>} */}
          </div>
          <div className={style.content}>
            {/* <h3>Dias: </h3> */}
            <select
              type="text"
              name="days"
              value={selectedDay}
              onChange={handleSelect}
              className={style.inputForm}
            >
              <option value="" disabled selected hidden>
                Días
              </option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miercoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sabado</option>
            </select>
            {/* {errors.days && <p>{errors.days}</p>} */}
            <div>
              <div className={style.inputDelete}>
                {form?.days?.length > 0 ? (
                  form?.days?.map((day) => (
                    <div className={style.inputDel} key={day}>
                      <button onClick={() => handleRemove("days", day)}>
                        X
                      </button>
                      <h3>{day}</h3>
                    </div>
                  ))
                ) : (
                  <p>No se han seleccionado dias</p>
                )}
              </div>
            </div>
          </div>

          <div className={style.content}>
            {/* <h3>Horarios: </h3> */}
            <select
              type="text"
              name="hours"
              value={selectedHour}
              onChange={handleSelect}
              className={style.inputForm}
            >
              <option value="" disabled selected>
                Horarios
              </option>
              <option value="10-11">10hs a 11hs</option>
              <option value="11-12">11hs a 12hs</option>
              <option value="12-13">12hs a 13hs</option>
              <option value="13-14">13hs a 14hs</option>
              <option value="14-15">14hs a 15hs</option>
              <option value="15-16">15hs a 16hs</option>
              <option value="16-17">16hs a 17hs</option>
              <option value="17-18">17hs a 18hs</option>
              <option value="18-19">18hs a 19hs</option>
              <option value="19-20">19hs a 20hs</option>
            </select>
            {/* {errors.hours && <p>{errors.hours}</p>} */}
            <div>
              <div className={style.inputDelete}>
                {form?.hours?.length > 0 ? (
                  form?.hours?.map((hour) => (
                    <div className={style.inputDel} key={hour}>
                      <button onClick={() => handleRemove("hours", hour)}>
                        X
                      </button>
                      <h3>{hour}hs</h3>
                    </div>
                  ))
                ) : (
                  <p>No se han seleccionado horarios</p>
                )}
              </div>
            </div>
          </div>

          <div className={style.content}>
            {/* <h3>Edades: </h3> */}
            <select
              type="text"
              name="age"
              value={selectedAge}
              onChange={handleSelect}
              className={style.inputForm}
            >
              <option value="" disabled selected>
                Edades
              </option>
              <option value="Niños">Niños</option>
              <option value="Adultos">Adultos</option>
            </select>
            {/* {errors.age && <p>{errors.age}</p>} */}
            <div>
              <div className={style.inputDelete}>
                {form?.age?.length > 0 ? (
                  form?.age?.map((ag) => (
                    <div className={style.inputDel} key={ag}>
                      <button onClick={() => handleRemove("age", ag)}>X</button>
                      <h3>{ag}</h3>
                    </div>
                  ))
                ) : (
                  <p>No se han seleccionado edades</p>
                )}
              </div>
            </div>
          </div>

          <div className={style.content}>
            {/* <h3>Cantidad de jugadores: </h3> */}
            <select
              type="text"
              name="players"
              value={selectedPlayers}
              onChange={handleSelect}
              className={style.inputForm}
            >
              <option value="" disabled selected>
                Participantes
              </option>
              <option value="2-4">2 a 4 jugadores</option>
              <option value="4-8">4 a 8 jugadores</option>
              <option value="+8">+8 jugadores</option>
            </select>
            {/* {errors.players && <p>{errors.players}</p>} */}
            <div>
              <div className={style.inputDelete}>
                {form?.players?.length > 0 ? (
                  form?.players?.map((player) => (
                    <div className={style.inputDel} key={player}>
                      <button onClick={() => handleRemove("players", player)}>
                        X
                      </button>
                      <h3>{player} jugadores</h3>
                    </div>
                  ))
                ) : (
                  <p>No se han seleccionado cantidades de jugadores</p>
                )}
              </div>
            </div>
          </div>
          <div className={style.content}>
            {/* <h3>Sucursales: </h3> */}
            <select
              type="number"
              name="store"
              value={selectedStore}
              onChange={handleSelect}
              className={style.inputForm}
            >
              <option value="" disabled selected>
                Sucursales
              </option>
              {allStores.map((store) => (
                <option value={parseInt(store.id)}>{store.name}</option>
              ))}
            </select>
            {/* {errors.store && <p>{errors.store}</p>} */}
            <div className={style.inputDelete}>
              {form?.store?.length > 0 ? (
                form?.store?.map((storeId) => {
                  const selectedStore = allStores.find(
                    (store) => Number(store.id) === Number(storeId)
                  );
                  // const storeName = selectedStore.name
                  return (
                    <div className={style.inputDel} key={storeId}>
                      <button onClick={() => handleRemove("store", storeId)}>
                        X
                      </button>
                      <h3>{selectedStore.name}</h3>
                    </div>
                  );
                })
              ) : (
                <p>No se han seleccionado sucursales</p>
              )}
            </div>
          </div>
        </div>
        <div className={style.btnContainer}>
          <button className={style.btn} type="submit">
            Editar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateActivity;
