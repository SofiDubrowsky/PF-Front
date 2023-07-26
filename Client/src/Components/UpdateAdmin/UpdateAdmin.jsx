import { useState } from "react";
import { useEffect } from "react";
import style from "./UpdateAdmin.module.css";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/Actions/createUser";
import Swal from "sweetalert2";




const UpdateAdmin = ({setUpdate, setShowBackdrop, setShowUpdate}) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name,
    phone: "",
    password: "",
    email: "",
    client:false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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
    if (!form.email) {
        errors.email = "Se requiere un email";
    }
    if (!/^(?! *$)[A-Za-z0-9 ]{5,25}$/.test(form.name)) {
      errors.name = "El nombre debe contener letras 5-25 caracteres";
    }
    if (!/^[0-9]{1,10}$/.test(form.phone)) {
      errors.phone = "El teléfono solo puede contener 10 números sin espacios";
    }
    if (!form.password) {
      errors.password = "Se requiere una contraseña";
    }
    if (!/^(?! *$)[A-Za-z0-9 ]{6,25}$/.test(form.password)) {
      errors.password = "La contraseña debe contener 6-10 caracteres";
    }
    return errors;
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    setForm({
      ...form,
    });

    setErrors(validate(form));
    const error = validate(form);
    if (Object.values(error).length !== 0) {
      alert("Debe rellenar el campo obligatorio");
    } else {

      dispatch(createUser(form));
      setTimeout(() => {
        setUpdate(true)
      }, 1500);
      Swal.fire({
        icon: "success",
        title: "Administrador Creado!",
        text: "El administrador ha sido creado correctamente.",
        showConfirmButton: false,
        color: "#FFFFFF",
        background: "#666",
        timer: 3000,
      }).then((result) => {
        if (result.isConfirmed) {
          setActualizar(true);
        } else {
          navigate("/admin");
        }
      });
    }

    setShowBackdrop(false)
    setShowUpdate(false)
  };

  useEffect(() => {
    const requiredFields = ["name", "password"];
    const allFieldsHaveValue = requiredFields.every((field) => form[field]);
    setButtonDisabled(!allFieldsHaveValue);
  }, [form]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      </div >
      <div className={style.divInput}>
      <input
          className={style.inputForm}
          type="text"
          value={form.email}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email && <p className={style.error}>{errors.email}</p>}
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
   

      
        
      <div style={{display:"flex",justifyContent:"center"}}><button
        className={style.editarBtn}
        type="submit"
        disabled={buttonDisabled}
      >
        Crear
      </button></div>
    </form>
  );
};

export default UpdateAdmin;