import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import style from "./UpdateUser.module.css"

const UpdateUser = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    picture: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
    setErrors(
      validate({
        ...form,
        [event.target.name]: event.target.value
      })
    );
  };

  const validate = (form) => {
    let errors = {};

    if (!form.name) {
      errors.name = "Se requiere un nombre";
    }
    if (/^[0-9\s]*$/.test(form.name)) {
      errors.name = "El nombre no puede tener espacios y debe contener letras";
    }
    if (!/^[0-9]{0,10}$/.test(form.phone)) {
      errors.phone = "El teléfono solo puede contener 10 números";
    }
    if (!form.phone) {
      errors.phone = null;
    }
    if (!form.picture) {
      errors.picture = null;
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(form));
    const error = validate(form);
    if (Object.values(error).length !== 0) {
      alert("Debe rellenar el campo obligatorio");
    } else {
      dispatch(putUser(form));
      setForm({
        name: "",
        phone: "",
        picture: ""
      });
    }
  };

  useEffect(() => {
    const requiredFields = ["name", "phone", "picture"];
    const allFieldsHaveValue = requiredFields.every((field) => form[field]);
    setButtonDisabled(!allFieldsHaveValue);
  }, [form]);

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.divInput}>
        <input className={style.inputForm} type="text" value={form.name} name="name" placeholder="Nombre" onChange={handleChange}/>
        {errors.name && <p className={style.error}>{errors.name}</p>}
      </div>

      <div className={style.divInput}>
        <input className={style.inputForm} type="text" value={form.phone} name="phone" placeholder="Teléfono" onChange={handleChange}/>
        {errors.phone && <p className={style.error}>{errors.phone}</p>}
      </div>

      <div className={style.divInput}>
        <input className={style.inputForm} type="file" accept="image/*" value={form.picture} name="picture" title="Subir Imagen" onChange={handleChange}/>
        {errors.picture && <p className={style.error}>{errors.picture}</p>}
      </div>

      <button className={style.editarBtn} type="submit" disabled={buttonDisabled}>
        Aplicar Cambios
      </button>
    </form>
  );
};

export default UpdateUser;