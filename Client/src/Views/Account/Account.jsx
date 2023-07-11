import style from "../Login/Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/Actions/createUser";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    dispatch(createUser(user))
      .then((response) => {
        alert("Created");
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
          alert(error.response.data.error);
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={(event) => handleSubmit(event)}>
        <div onClick={() => navigate("/login")} className={style.arrow}>
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
        <h2>Create account:</h2>
        <div className={style.text}>

        <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={(event) => handleChange(event)}
          />
          <label>Telefono:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={(event) => handleChange(event)}
          />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={(event) => handleChange(event)}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div>
          <button className={style.btn}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Account;
