import { useState } from "react";

const Form = () => {
    const [form,setForm] = useState({
        name:"",
        description:"",
        picture:[],
        cost:"",
        hours:[],
        days:[],
    })

    const [errors, setErrors] = useState({});

    return (
        <div>
            <h1>Añadir nueva actividad</h1>
            <form >
            <label>Titulo</label>
            <input type="text" value={form.name} name="name"/>

            <label>Fotos</label>
            <input type="text" value={form.picture} name="picture"/>

            <label>Descripción</label>
            <textarea type="text" value={form.description} name="description"/>

            <label>Dias</label>
            <input type="text" value={form.days.join(",")}/>
              <select type="text" value={form.days} name="dias">
                <option value="lunes">lunes</option>
                <option value="martes">martes</option>
                <option value="miercoles">miercoles</option>
                <option value="jueves">jueves</option>
                <option value="viernes">viernes</option>
                <option value="sabado">sabado</option>
              </select>

            <label>Horarios</label>
              <select type="text" value={form.hours} name="horas">
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
                        <h3>{hour}</h3>
                      </div>
                      )))
                  : (<p>No se han seleccionado horarios</p>)  
                  }
                </div>
              </div>


              <label>Sucursales</label>
                <select name='sucursal'>
                  <option value="" disabled selected>Seleccione Sucursal</option>
                  <option value="Cerro de las Rosas">Cerro de las Rosas</option>
                </select>

        <button type="submit">Crear</button>
            </form>
        </div>
    )
}

export default Form;