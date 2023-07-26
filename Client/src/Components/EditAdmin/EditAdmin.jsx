import { useState } from "react";
import { useEffect } from "react";
import style from "./EditAdmin.module.css";
import { useDispatch } from "react-redux";
import { editAdmin } from "../../redux/Actions/editAdmin";




const EditAdmin = ({setUpdate, setShowBackdrop, setShowEdit, id}) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    password: "",
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

    if (!/^(?! *$)[A-Za-z0-9 ]{6,25}$/.test(form.password)) {
      errors.password = "La contraseña debe contener 6-10 caracteres";
    }

    if (!form.password || !/.*\d+.*/.test(form.password)) {
        errors.password = 'La contraseña debe tener al menos un número';
    }
    return errors;
  };

  
  const handleEdit = (event) => {
    event.preventDefault();
    setForm({
      ...form,
    });

    setErrors(validate(form));
    const error = validate(form);
    if (Object.values(error).length !== 0) {
      alert("Debe rellenar el campo obligatorio");
    } else {

      dispatch(editAdmin(id, form.password));
      setTimeout(() => {
        setUpdate(true)
      }, 1500);
    }

    setShowBackdrop(false)
    setShowEdit(false)
  };

  useEffect(() => {
    const requiredFields = ["password"];
    const allFieldsHaveValue = requiredFields.every((field) => form[field]);
    setButtonDisabled(!allFieldsHaveValue);
  }, [form]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  return (
    <form onSubmit={handleEdit}>
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
        Editar
      </button></div>
    </form>
  );
};

export default EditAdmin;