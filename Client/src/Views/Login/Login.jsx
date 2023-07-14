import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { login } from "../../redux/Actions/login";
import { loginGoogle } from "../../redux/Actions/loginGoogle";
import validate from "./validate";
import Swal from "sweetalert2";
import GoogleLogin from "react-google-login"
import { gapi } from "gapi-script"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    googleId: "",
    imageUrl: "",
    name: "",
  });


  //Autenticación con Google
  const clientID = "799510211200-rga3f3jto5ngstqpo52vkjospb5inmrh.apps.googleusercontent.com"

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID
      })
    }
    gapi.load("client:auth2", start)
  },[])

  const onSuccess = (response) => {
    const user = {
      email: response.profileObj.email,
      googleId: response.profileObj.googleId,
      name: response.profileObj.name,
    }
    dispatch(loginGoogle(user)).then(() => {
      //window.location.href = "/home";
    });

  }

  const onFailure = () => {
    console.log("no se pudo iniciar sesión");
  }

  //--------------------------
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
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
      dispatch(login(user))
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Inicio de sesión exitoso",
            showConfirmButton: false,
            timer: 1500,
          });

          setUser({
            email: "",
            password: "",
          });

          navigate("/home");
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
        <div onClick={() => navigate("/home")} className={style.arrow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-narrow-left"
            width="32"
            height="32"
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
        <h2>Inicia sesión:</h2>
        <div className={style.text}>
          <h3 className={style.label2} box-shadow="transparent">Correo electrónico:</h3>
          <input type="text" name="email" value={user.email} onChange={(event) => handleChange(event)} />
          {errors.email && <span className={style.error}>{errors.email}</span>}

          <h3 className={style.label2} box-shadow="transparent">Contraseña:</h3>
          <input type="password" name="password" value={user.password} onChange={(event) => handleChange(event)} />
          {errors.password && <span className={style.error}>{errors.password}</span>}
        </div>
        <div>
          <button className={style.btn}>Acceder</button>
        </div>
        <div className={style.googleContainer}> 
          <p>Or</p>
          <GoogleLogin
            clientId = {clientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div>
          <NavLink to="/account" className={style.navlink}>
            <p>¿Aún no tienes cuenta?</p>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
