import style from "./UpdateActivity.module.css";
// import validate from "../../Views/Form/validate";
import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { updateActivity } from "../../redux/Actions/updateActivity";
import { useDispatch, useSelector } from "react-redux";
import validate from "../../Views/Form/validate";
import { useParams } from "react-router-dom";


const UpdateActivity = ({details}) => {
  const dispatch = useDispatch();
  // const { id } = useParams();
  // const details = useSelector((state) => state.detail);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  // const [selectedStore, setSelectedStore] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState("");
  const [errors, setErrors] = useState({});

  const id = details?.id;
  const [form, setForm] = useState({
    name: details?.name || "",
    cost: details?.cost || 0,
    age: details?.age || [],
    players: details?.players || [],
    days: details?.days || [],
    hours: details?.hours || [],
    stores: details?.stores || []
  })
  
  useEffect(() => {
    setForm({
      name: details?.name || "",
      cost: details?.cost || 0,
      age: details?.age || [],
      players: details?.players || [],
      days: details?.days || [],
      hours: details?.hours || [],
      stores: details?.stores || []
    });
  }, [details]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name] : event.target.value
    })
  }

  const handleSelect = (event) => {
    const repet = form[event.target.name].includes(event.target.value);
    if (!repet) {
      setForm({
        ...form,
        [event.target.name]: [...form[event.target.name], event.target.value],
      });
      setErrors(
        validate({
          ...form,
          [event.target.name]: [...form[event.target.name], event.target.value],
        })
      );
    }
  }
  const handleRemove = (key, item) => {
    event.preventDefault();
    setForm((prevForm) => ({
      ...prevForm,
      [key]: prevForm[key].filter((selectedItem) => selectedItem !== item),
    }));

    if (key === "days") {
      setSelectedDay("");
    } else if (key === "hours") {
      setSelectedHour("");
    } else if (key === "age") {
      setSelectedAge("");
    } else if (key === "players") {
      setSelectedPlayers("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateActivity(form, id))
    
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
              value={form?.name}
              name="name"
              onChange={(event) => handleChange(event)}
              placeholder="Nombre"
              className={style.inputForm}
            />
          </div>

          <div className={style.content}>
            <input
              type="number"
              min="0"
              value={form?.cost}
              name="cost"
              onChange={handleChange}
              placeholder="Precio"
              className={style.inputForm}
            />
          </div>

          <div className={style.content}>
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
            <div>
              <div className={style.inputDelete}>
                {form?.days?.length > 0 ? (
                  (form?.days)?.map((day) => (
                    <div className={style.inputDel} key={day}>
                      <button onClick={() => handleRemove("days", day)}>
                        X
                      </button>
                      <h3>{day}</h3>
                    </div>
                  ))
                ) : null
                }
              </div>
            </div>
          </div>

          <div className={style.content}>
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
                ) : null}
              </div>
            </div>
          </div>

          <div className={style.content}>
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
            <div>
              <div className={style.inputDelete}>
                {form?.age?.length > 0 ? (
                  form?.age?.map((ag) => (
                    <div className={style.inputDel} key={ag}>
                      <button onClick={() => handleRemove("age", ag)}>X</button>
                      <h3>{ag}</h3>
                    </div>
                  ))
                ) : null}
              </div>
            </div>
          </div>

          <div className={style.content}>
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
            <div>
              <div className={style.inputDelete}>
                {form?.players?.length > 0 ? (
                  form?.players?.map(player => (
                    <div className={style.inputDel} key={player}>
                      <button onClick={() => handleRemove("players", player)}>
                        X
                      </button>
                      <h3>{player} jugadores</h3>
                    </div>
                  ))
                ) : null}
              </div>
            </div>
          </div>
          {/* <div className={style.content}>
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
              {allStores?.map((store) => (
                <option value={parseInt(store?.id)}>{store?.name}</option>
              ))}
            </select>
            <div className={style.inputDelete}>
              {form?.stores?.length > 0 ? (
                form?.stores?.map((storeId) => {
                  const selectedStore = allStores?.find(
                    (store) => Number(store?.id) === Number(storeId)
                  );
                  // const storeName = selectedStore.name
                  return (
                    <div className={style.inputDel} key={storeId}>
                      <button onClick={() => handleRemove("store", storeId)}>
                        X
                      </button>
                      <h3>{selectedStore?.name}</h3>
                    </div>
                  );
                })
              ) : null}
            </div>
          </div> */}
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
