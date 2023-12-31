import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { login } from "../../redux/Actions/login";
import { loginGoogle } from "../../redux/Actions/loginGoogle";
import validate from "./validate";
import Swal from "sweetalert2";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const detail = localStorage.getItem("detail");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loger, setLoger] = useState(localStorage.getItem("loger") ?? false);

  const [errors, setErrors] = useState({
    email: "",
    googleId: "",
    imageUrl: "",
    name: "",
  });

  useEffect(() => {
    localStorage.setItem("loger", loger);
  }, [loger]);

  //Autenticación con Google
  const clientID =
    "799510211200-rga3f3jto5ngstqpo52vkjospb5inmrh.apps.googleusercontent.com";

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    const user = {
      email: response.profileObj.email,
      googleId: response.profileObj.googleId,
      name: response.profileObj.name,
    };
    dispatch(loginGoogle(user)).then(() => {
      if (detail !== "null") {
        navigate(`/detail/${Number(detail)}`);
      } else {
        navigate("/home");
      }
    });
  };

  const onFailure = () => {
    console.log("no se pudo iniciar sesión");
  };

  //--------------------------
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
      dispatch(login(user))
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Inicio de sesión exitoso",
            showConfirmButton: false,
            timer: 2000,
            background: "#666",
            color: "#FFFFFF"
          });

          setUser({
            email: "",
            password: "",
          });

          if (detail !== "null") {
            navigate(`/detail/${Number(detail)}`);
          } else {
            navigate("/home");
          }

          localStorage.setItem("loger", true);
        })
        .catch((error) => {
          if (error.response) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.response.data.error,
              background: "#666",
              color: "#FFFFFF",
              showConfirmButton: false,
              timer: 2000
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
              background: "#666",
              color: "#FFFFFF",
              showConfirmButton: false,
              timer: 2000
            });
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Por favor, complete correctamente todos los campos.",
        background: "#666",
        color: "#FFFFFF",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={(event) => handleSubmit(event)}>
        <h2>Inicia sesión</h2>
        <div className={style.text}>
          <div className={style.content}>
            <input
              type="text"
              name="email"
              value={user.email}
              placeholder="Correo Electrónico"
              onChange={(event) => handleChange(event)}
            />
            {errors.email && (
              <span className={style.error}>{errors.email}</span>
            )}
          </div>
          <div className={style.content}>
            <input
              type="password"
              name="password"
              value={user.password}
              placeholder="Contraseña"
              onChange={(event) => handleChange(event)}
            />
            {errors.password && (
              <span className={style.error}>{errors.password}</span>
            )}
          </div>
        </div>
        <div>
          <button className={style.btn}>Acceder</button>
        </div>
        <p className={style.p1Login}>O accede mediante</p>
        <div className={style.googleContainer}>
          <GoogleLogin
            clientId={clientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div>
          <NavLink to="/account" className={style.account}>
            <p className={style.p2Login}>¿Aún no tienes cuenta?</p>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
