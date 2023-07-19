import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./Form.module.css";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import validate from "./validate";
import { postStore } from "../../redux/Actions/postStore";
import { getStores } from "../../redux/Actions/getStores";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Autocomplete, LoadScript } from "@react-google-maps/api";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET = import.meta.env.VITE_API_SECRET;
const PRESET = import.meta.env.VITE_PRESET;
const API_KEY_GOOGLE = import.meta.env.VITE_APY_KEY_GOOGLE;

const reload = () => {
  window.location.reload(false);
};

const FormStores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allStores = useSelector((state) => state.stores);
  const isClient = localStorage.getItem('isClient')

  const [form, setForm] = useState({
    name: "",
    address: "",
    picture: [],
    phone: "",
    email: "",
    maps: "",
  });

  const [errors, setErrors] = useState({});
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    isClient === 'true' && navigate('/home')
  },[isClient])

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handlePlaceSelect = () => {
    if (autocomplete && autocomplete.getPlace) {
      const place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const { lat, lng } = place.geometry.location;
        const mapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.4638070892015!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432991f01067b25%3A0x50ecf42223ab5c6!2sLa%20Hierra%203117%2C%20X5009%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1689737842043!5m2!1ses-419!2sar`;
        setForm((prevForm) => ({
          ...prevForm,
          address: place.formatted_address,
          maps: mapsUrl,
        }));
      }
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
    if (files.length > 0) {
      const formData = new FormData();
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
          setErrors(
            validate({
              ...form,
              picture: [...form.picture, data.secure_url],
            })
          );
        })
        .catch((error) => {
          console.error("Error al subir la imagen a Cloudinary:", error);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errorSave = validate(form);
    const existName = allStores.find(
      (store) =>
        store.name.toLowerCase() === form.name.toLocaleLowerCase()
    )
      ? 1
      : 0;
    if (existName === 1){
      Swal.fire({
        text: `Ya existe la sucursal "${form.name}"`,
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true
      });
    }
    else if (Object.values(errorSave).length !== 0){
      Swal.fire({
        text: 'Debes completar todos los datos obligatorios',
        timerProgressBar: true
      })
    }
    else {
      dispatch(postStore(form));
      Swal.fire({
        text: 'Sucursal Creada!',
        icon: 'success',
        showConfirmButton: true,
        showCancelButton: true, 
        confirmButtonText: 'Agregar nueva sucursal', 
        cancelButtonText: 'Volver al Inicio', 
      }).then((result) => {
        if (result.isConfirmed) {
         navigate('/postStore')
          setTimeout(reload, 3000);  // Espera 3 segundos antes de llamar a reload()
        } else {
         navigate('/home');
        }
      })
      setForm({
        name: "",
        address: "",
        picture: [],
        phone: "",
        email: "",
        maps: "",
      });
    }
  };

  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);

  return (
    <div className={style.contenedor}>

      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
      <h2>Crear nueva sucursal:</h2>
        <div className={style.allInputs}>
        <div className={style.content}>
          {/* <h3>Titulo: </h3> */}
          <input
            type="text"
            value={form.name}
            name="name"
            onChange={handleChange}
            placeholder="Nombre"
            className={style.inputForm}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div className={style.content}>
          {/* <h3>Titulo: </h3> */}
          <input
            type="text"
            value={form.email}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className={style.inputForm}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className={style.content}>
          {/* <h3>Titulo: </h3> */}
          <input
            type="text"
            value={form.phone}
            name="phone"
            onChange={handleChange}
            placeholder="Telefono"
            className={style.inputForm}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>

        <div className={style.content}>
            <LoadScript
              googleMapsApiKey={API_KEY_GOOGLE}
              libraries={["places"]}
            >
              <Autocomplete
                onLoad={(ac) => {
                  setAutocomplete(ac);
                }}
                onPlaceChanged={handlePlaceSelect}
              >
                <input
                  type="text"
                  value={form.address}
                  name="address"
                  onChange={handleChange}
                  placeholder="Dirección"
                  className={style.inputForm}
                />
              </Autocomplete>
            </LoadScript>
            {errors.address && <p>{errors.address}</p>}
          </div>

          <div className={style.content}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={form.picture.length > 1}
            className={style.inputForm}
          />
          {errors.picture && <p>{errors.picture}</p>}
          </div>

           <div className={style.contentt}>
           {form.maps ? (
              <iframe
                src={form.maps}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={style.mapIframe}
              ></iframe>
            ) 
            :
            (
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217955.001848276!2d-64.35902612598491!3d-31.399054704450794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432985f478f5b69%3A0xb0a24f9a5366b092!2zQ8OzcmRvYmE!5e0!3m2!1ses-419!2sar!4v1689742534911!5m2!1ses-419!2sar'
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={style.mapIframe}
              ></iframe>
            )
          }
          </div>

          <div className={style.content}>
          <div className={style.imagepreview}>
            {form.picture?.map((imageUrl) => (
              <div key={imageUrl} className={style.imagecontainer}>
                <Image publicId={imageUrl} cloudName={CLOUD_NAME}>
                  <Transformation width="100" height="100" crop="thumb" />
                </Image>
                <button
                  className={style.removebutton}
                  onClick={() => handleRemoveImage(imageUrl)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
           </div>
          </div>

        
        <div className={style.btnContainer}>

        <button className={style.btn} type="submit">
          Crear
        </button>
        </div>
      </form>
    </div>
  );
};

export default FormStores;
