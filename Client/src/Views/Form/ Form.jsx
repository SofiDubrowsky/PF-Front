import { useState } from "react";
import style from "./Form.module.css"

const Form = () => {
    const [form,setForm] = useState({
        name:"",
        description:"",
        picture:[],
        cost:"",
        hours:[],
        days:[],
        sucursalId:[],
    })

    const [errors, setErrors] = useState({});

    const [selectedDay, setSelectedDay] = useState("");
    const [selectedHour, setSelectedHour] = useState("");
    const [selectedSucursal, setSelectedSucursal] = useState("");

    const handleChange = (event) => {
      setForm({
          ...form,
          [event.target.name]: event.target.value
      })
      setErrors(validate({
          ...form,
          [event.target.name]: event.target.value
      }))
    }

    const handleSelect = (event) => {
      const repet = form[event.target.name].includes(event.target.value)
      if(!repet){
          setForm({
              ...form,
              [event.target.name]: [...form[event.target.name], event.target.value]
          })
          setErrors(validate({
              ...form,
              [event.target.name]: [...form[event.target.name], event.target.value]
          }))
      }
    }

    const handleRemove = (key, item) => {
      event.preventDefault();
      setForm((prevForm) => ({
        ...prevForm,
        [key]: prevForm[key].filter((selectedItem) => selectedItem !== item),
      }));
    
      if (key === 'days') {
        setSelectedDay("");
      } else if (key === 'hours') {
        setSelectedHour("");
      } else if (key === 'sucursalId') {
        setSelectedSucursal("");
      }
    };

    return (
        <div >
            <h1>Añadir nueva actividad</h1>
            <form className={style.form}>
            <label>Titulo</label>
            <input type="text" value={form.name} name="name" onChange={handleChange}/>

            <label>Fotos</label>
            <input type="text" value={form.picture} name="picture"/>

            <label>Descripción</label>
            <textarea type="text" value={form.description} name="description" onChange={handleChange}/>

            <label>Dias</label>
              <select type="text" name="days" value={selectedDay} onChange={handleSelect}>
                <option value="" disabled selected>Seleccionar</option>
                <option value="lunes">lunes</option>
                <option value="martes">martes</option>
                <option value="miercoles">miercoles</option>
                <option value="jueves">jueves</option>
                <option value="viernes">viernes</option>
                <option value="sabado">sabado</option>
              </select>

              <div className="daysConteiner">
                <div className="daysSelected">
                  {
                  form?.days?.length > 0 ?
                  (
                    form?.days?.map((day) => (
                      <div className="day">
                        <h3>{day}</h3>
                        <button onClick={() => handleRemove('days', day)}>X</button>
                      </div>
                      )))
                  : (<p>No se han seleccionado dias</p>)  
                  }
                </div>
              </div>

            <label>Horarios</label>
              <select type="text" name="hours" value={selectedHour} onChange={handleSelect}>
                <option value="" disabled selected>Seleccionar</option>
                <option value="10-11">10hs a 11hs</option>
                <option value="11-12">11hs a 12hs</option>
                <option value="12-13">12hs a 13hs</option>
                <option value="13-14">13hs a 14hs</option>
                <option value="15-16">14hs a 15hs</option>
                <option value="16-17">16hs a 17hs</option>
                <option value="17-18">17hs a 18hs</option>
                <option value="18-19">18hs a 19hs</option>
                <option value="19-20">19hs a 20hs</option>
              </select>

              <div className="hoursConteiner">
                <div className="hoursSelected">
                  {
                  form?.hours?.length > 0 ?
                  (
                    form?.hours?.map((hour) => (
                      <div className="hour">
                        <h3>{hour}hs</h3>
                        <button onClick={() => handleRemove('hours', hour)}>X</button>
                      </div>
                      )))
                  : (<p>No se han seleccionado horarios</p>)  
                  }
                </div>
              </div>


              <label>Sucursales</label>
                <select type="text" name='sucursalId' value={selectedSucursal} onChange={handleSelect}>
                  <option value="" disabled selected>Seleccionar</option>
                  <option value="cerroID">Cerro de las Rosas</option>
                </select>

              <div className="sucursalsConteiner">
                <div className="sucursalsSelected">
                  {
                  form?.sucursalId?.length > 0 ?
                  (
                    form?.sucursalId?.map((sucursal) => (
                      <div className="sucursal">
                        <h3>{sucursal}</h3>
                        <button onClick={() => handleRemove('sucursalId', sucursal)}>X</button>
                      </div>
                      )))
                  : (<p>No se han seleccionado sucursales</p>)  
                  }
                </div>
              </div>

        <button type="submit">Crear</button>
            </form>
        </div>
    )
}

export default Form;