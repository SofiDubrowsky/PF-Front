import style from "../Login/Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/Actions/createUser";
import validate from "../Account/validate";
import Swal from "sweetalert2";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validate({
        ...user,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errorSave = validate(user);

    if (Object.keys(errorSave).length === 0) {
      dispatch(createUser(user))
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Cuenta creada exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });

          setUser({
            email: "",
            password: "",
            name: "",
            phone: "",
          });

          navigate("/login");
        })
        .catch((error) => {
          if (error.response) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.response.data.error,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
            });
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Por favor, complete correctamente todos los campos.",
      });
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={(event) => handleSubmit(event)}>
        <div onClick={() => navigate("/login")} className={style.arrow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-narrow-left"
            width="32"
            height="50"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#9e9e9e"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l4 4" />
            <path d="M5 12l4 -4" />
          </svg>
        </div>
        <h2>Crear cuenta:</h2>
        <div className={style.text}>
          <h3 className={style.label2}>Nombre:</h3>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={(event) => handleChange(event)}
          />
          {errors.name && <span className={style.error}>{errors.name}</span>}

          <h3 className={style.label2}>Movil:</h3>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={(event) => handleChange(event)}
          />
          {errors.phone && <span className={style.error}>{errors.phone}</span>}

          <h3 className={style.label2}>Correo electrónico:</h3>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={(event) => handleChange(event)}
          />
          {errors.email && <span className={style.error}>{errors.email}</span>}

          <h3 className={style.label2}>Contraseña:</h3>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(event) => handleChange(event)}
          />
          {errors.password && <span className={style.error}>{errors.password}</span>}
        </div>
        <div>
          <button className={style.btn}>Crear</button>
        </div>
      </form>
    </div>
  );
};

export default Account;