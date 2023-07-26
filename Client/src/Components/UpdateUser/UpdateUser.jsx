import { useState } from "react";
import { useEffect } from "react";
import style from "./UpdateUser.module.css";
import { updateUser } from "../../redux/Actions/updateUser";
import { useSelector, useDispatch } from "react-redux";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET = import.meta.env.VITE_API_SECRET;
const PRESET = import.meta.env.VITE_PRESET;

const UpdateUser = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const userDetail = useSelector((state) => state.userDetail);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const dispatch = useDispatch();
  let url = imagePreviewUrl;
  const [form, setForm] = useState({
    name: userDetail?.name,
    phone: userDetail?.phone,
    picture: "",
    password: userDetail?.password,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const reload = () => {
    window.location.reload(false);
  };

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

  const validate = (form) => {
    let errors = {};

    if (!form.name) {
      errors.name = "Se requiere un nombre";
    }
    if (!/^(?! *$)[A-Za-z0-9 ]{5,25}$/.test(form.name)) {
      errors.name = "El nombre debe contener letras 5-25 caracteres";
    }
    if (form.phone && !/^[0-9]{1,10}$/.test(form.phone)) {
      errors.phone = "El teléfono solo puede contener hasta 10 números sin espacios";
    }
    if (!form.password) {
      errors.password = "Se requiere una contraseña";
    }
    if (!/^(?! *$)[A-Za-z0-9 ]{6,25}$/.test(form.password)) {
      errors.password = "La contraseña debe contener 6-10 caracteres";
    }
    return errors;
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", PRESET);
    
      fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())

        .then((data) => {
          setImagePreviewUrl(data.secure_url);
          setForm((prevForm) => ({
            ...prevForm,
            picture: data.secure_url,
          }));
        })

        .catch((error) => {
          console.error("Error al subir la imagen a Cloudinary:", error);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setForm({
      ...form,
      picture: url,
    });

    setErrors(validate(form));
    const error = validate(form);
    console.log(error);
    if (Object.values(error).length === 0) {
     
      dispatch(updateUser(form));
      setTimeout(reload, 1500);
    }
  };

  useEffect(() => {
    const requiredFields = ["name", "password"];
    const allFieldsHaveValue = requiredFields.every((field) => form[field]);
    setButtonDisabled(!allFieldsHaveValue);
  }, [form]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRemoveImage = () => {
    event.preventDefault();
    setForm((prevForm) => ({
      ...prevForm,
      picture: "",
    }));
    setImagePreviewUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.divInput}>
        <input
          className={style.inputForm}
          type="text"
          value={form.name}
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
        />
        {errors.name && <p className={style.error}>{errors.name}</p>}
      </div>

      <div className={style.divInput}>
        <input
          className={style.inputForm}
          type="text"
          value={form.phone}
          name="phone"
          placeholder="Teléfono"
          onChange={handleChange}
        />
        {errors.phone && <p className={style.error}>{errors.phone}</p>}
      </div>
      {userDetail?.password?.length > 10 ? undefined : (
        <div className={style.divInput}>
          <input
            className={style.inputPass}
            type={showPassword ? "text" : "password"}
            value={form.password}
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
          {errors.password && <p className={style.error}>{errors.password}</p>}
          <button
            type="button"
            className={style.toggleButton}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "⦿" : "◠"}
          </button>
        </div>
      )}

      <div className={style.divInput}>
        <input
          className={style.inputForm}
          type="file"
          accept="image/*"
          name="picture"
          title="Subir Imagen"
          onChange={handleImageUpload}
        />
        {errors.picture && <p className={style.error}>{errors.picture}</p>}
      </div>
      {imagePreviewUrl && (
        <div className={style.imagepreview}>
          <div className={style.imagecontainer}>
            <button
              className={style.removebutton}
              onClick={() => handleRemoveImage()}
            >
              X
            </button>
            <img src={imagePreviewUrl} alt="Preview" />
          </div>
        </div>
      )}
      <div style={{display:"flex",justifyContent:"center"}}><button
        className={style.editarBtn}
        type="submit"
        disabled={buttonDisabled}
      >
        Aplicar Cambios
      </button></div>
    </form>
  );
};

export default UpdateUser;
