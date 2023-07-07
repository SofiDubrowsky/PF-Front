import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./Form.module.css"
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import validate from "./validate";
import { postActivity } from "../../redux/Actions/postActivity";
import { getActivities } from "../../redux/Actions/getActivities";
import { getStores } from "../../redux/Actions/getStores";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
const API_KEY = import.meta.env.VITE_API_KEY
const API_SECRET = import.meta.env.VITE_API_SECRET
const PRESET = import.meta.env.VITE_PRESET

const reload = () => {
  window.location.reload(false);
}

const Form = () => {
    const dispatch = useDispatch();
    const allActivities = useSelector((state) => state.activities);
    const allStores = useSelector((state) => state.stores);

    const [form,setForm] = useState({
        name:"",
        description:"",
        picture:[],
        cost:undefined,
        hours:[],
        days:[],
        store:[],
        players:[],
        age:[],
    })

    const [errors, setErrors] = useState({});

    const [selectedDay, setSelectedDay] = useState("");
    const [selectedHour, setSelectedHour] = useState("");
    const [selectedStore, setSelectedStore] = useState("");
    const [selectedAge, setSelectedAge] = useState("");
    const [selectedPlayers, setSelectedPlayers] = useState("");

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
      console.log(selectedStore);
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
      } else if (key === 'store') {
        setSelectedStore("");
      } else if (key === 'age') {
        setSelectedAge("");
      } else if (key === 'players') {
        setSelectedPlayers("");
      } 
    };

    const handleRemoveImage = (imageUrl) => {
      setForm((prevForm) => ({
        ...prevForm,
        picture: prevForm.picture.filter((url) => url !== imageUrl),
      }));
    };

    const handleImageUpload = (event) => {
      const files = event.target.files;
      if (files.length>0)
      {const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", PRESET); // Usamos el preset definido en el archivo .env
    
      // Realizar la solicitud de subida a Cloudinary
      fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Obtener la URL de la imagen subida y actualizar el estado del formulario
          setForm((prevForm) => ({
            ...prevForm,
            picture: [...prevForm.picture, data.secure_url],
          }));
          setErrors(validate({
            ...form,
            picture: [...form.picture, data.secure_url],
          }));
        })
        .catch((error) => {
          console.error("Error al subir la imagen a Cloudinary:", error);
        });}
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const errorSave = validate(form);
      const existName = allActivities.find(activity => activity.name.toLowerCase() === form.name.toLocaleLowerCase()) ? 1 : 0;
      if(existName === 1) alert(`Ya existe la actividad ${form.name}`)
      else if(Object.values(errorSave).length !== 0) alert('Debes completar todos los datos obligatorios');
      else {
        dispatch(postActivity(form))
        alert('Actividad creada!')
        setForm({
          name:"",
          description:"",
          picture:[],
          cost:undefined,
          hours:[],
          days:[],
          store:[],
          players:[],
          age:[],
        })
      }
      reload();
    }

    useEffect(() => {
      dispatch(getActivities())
    }, [dispatch]);

    useEffect(() => {
      dispatch(getStores())
    }, [dispatch]);
  
    return (
        <div >
            <h1>Añadir nueva actividad</h1>
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
            <label>Titulo: </label>
            <input type="text" value={form.name} name="name" onChange={handleChange}/>
            {errors.name && <p>{errors.name}</p>}
            
            <label>Subir Fotos</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={form.picture.length >= 3}/>
            <div className={style.imagepreview}>
             {form.picture?.map((imageUrl) => (
               <div key={imageUrl} className={style.imagecontainer}>
               <Image publicId={imageUrl} cloudName={CLOUD_NAME}>
                 <Transformation width="100" height="100" crop="thumb" />
               </Image>
               <button
                 className={style.removebutton}
                 onClick={() => handleRemoveImage(imageUrl)}>
                 X
               </button>
               </div>
              ))}
            </div>
            {errors.picture && <p>{errors.picture}</p>}

            <label>Descripción: </label>
            <textarea type="text" value={form.description} name="description" onChange={handleChange}/>
            {errors.description && <p>{errors.description}</p>}

            <label>Precio: $</label>
            <input type="number" min="0" value={form.cost} name="cost" onChange={handleChange}/>
            {errors.cost && <p>{errors.cost}</p>}

            <label>Dias: </label>
              <select type="text" name="days" value={selectedDay} onChange={handleSelect}>
                <option value="" disabled selected>Seleccionar</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miercoles">Miercoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sabado">Sabado</option>
              </select>
              {errors.days && <p>{errors.days}</p>}

              <div className="daysConteiner">
                <div className="daysSelected">
                  {
                  form?.days?.length > 0 ?
                  (
                    form?.days?.map((day) => (
                      <div className="day" key={day}>
                        <h3>{day}</h3>
                        <button onClick={() => handleRemove('days', day)}>X</button>
                      </div>
                      )))
                  : (<p>No se han seleccionado dias</p>)  
                  }
                </div>
              </div>

            <label>Horarios: </label>
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
              {errors.hours && <p>{errors.hours}</p>}

              <div className="hoursConteiner">
                <div className="hoursSelected">
                  {
                  form?.hours?.length > 0 ?
                  (
                    form?.hours?.map((hour) => (
                      <div className="hour" key={hour}>
                        <h3>{hour}hs</h3>
                        <button onClick={() => handleRemove('hours', hour)}>X</button>
                      </div>
                      )))
                  : (<p>No se han seleccionado horarios</p>)  
                  }
                </div>
              </div>

              <label>Edades: </label>
              <select type="text" name="age" value={selectedAge} onChange={handleSelect}>
                <option value="" disabled selected>Seleccionar</option>
                <option value="Niños">Niños</option>
                <option value="Adultos">Adultos</option>
              </select>
              {errors.age && <p>{errors.age}</p>}

              <div className="agesConteiner">
                <div className="agesSelected">
                  {
                  form?.age?.length > 0 ?
                  (
                    form?.age?.map((ag) => (
                      <div className="age" key={ag}>
                        <h3>{ag}</h3>
                        <button onClick={() => handleRemove('age', ag)}>X</button>
                      </div>
                      )))
                  : (<p>No se han seleccionado edades</p>)  
                  }
                </div>
              </div>

              <label>Cantidad de jugadores: </label>
              <select type="text" name="players" value={selectedPlayers} onChange={handleSelect}>
                <option value="" disabled selected>Seleccionar</option>
                <option value="2-4">2 a 4 jugadores</option>
                <option value="4-8">4 a 8 jugadores</option>
                <option value="+8">+8 jugadores</option>
              </select>
              {errors.players && <p>{errors.players}</p>}

              <div className="playersConteiner">
                <div className="playersSelected">
                  {
                  form?.players?.length > 0 ?
                  (
                    form?.players?.map((player) => (
                      <div className="players" key={player}>
                        <h3>{player} jugadores</h3>
                        <button onClick={() => handleRemove('players', player)}>X</button>
                      </div>
                      )))
                  : (<p>No se han seleccionado cantidades de jugadores</p>)  
                  }
                </div>
              </div>


              {/* <label>Sucursales: </label>
              <select type="text" name='storeId' value={selectedStore} onChange={handleSelect}>
                <option value="" disabled selected>Seleccionar</option>
                <option value="cerroID">Cerro de las Rosas</option>
              </select>
              {errors.storeId && <p>{errors.storeId}</p>} */}

              <label>Sucursales: </label>
              <select type="number" name='store' value={selectedStore} onChange={handleSelect}>
                <option value="" disabled selected>Seleccionar</option>
                {allStores.map((store)=> (
                  <option value={parseInt(store.id)}>{store.name}</option>
                ))}
              </select> 
              {errors.store && <p>{errors.store}</p>}
              
              <div className="storesSelected">
              {form?.store?.length > 0 ? (
                form?.store?.map((storeId) => {
                  const selectedStore = allStores.find((store) => Number(store.id) === Number(storeId));
                  // const storeName = selectedStore.name
                  return (
                  <div className="store" key={storeId}>
                    <h3>{selectedStore.name}</h3>
                    <button onClick={() => handleRemove('store', storeId)}>X</button>
                  </div>
                  );
                })
              ) : (
              <p>No se han seleccionado sucursales</p>
              )}
               </div>


              {/* <div className="storesConteiner">
                <div className="storesSelected">
                  {
                  form?.store?.length > 0 ?
                  (
                    form?.store?.map((store) => (
                      <div className="store" key={store}>
                        <h3>{store}</h3>
                        <button onClick={() => handleRemove('store', store)}>X</button>
                      </div>
                      )))
                  : (<p>No se han seleccionado sucursales</p>)  
                  }
                </div>
              </div> */}

              {/* <div className="storesConteiner">
                <div className="storesSelected">
                  {
                  form?.store?.length > 0 ?
                  (
                    form?.store?.map((store) => allStores.map(storeState =>{
                      if(store === storeState.id) {
                        return (
                          <div className="store" key={store}>
                            <h3>{storeState.name}</h3>
                            <button onClick={() => handleRemove('store', store)}>X</button>
                          </div>
                          )
                      }
                    }) 
                    ))
                  : (<p>No se han seleccionado sucursales</p>)  
                  }
                </div>
              </div> */}

               <button type="submit">Crear</button>
            </form>
        </div>
    )
}

export default Form;