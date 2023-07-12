const validate = (account) => {
  let errors = {};

  if (!account.name || !/^[A-Za-z0-9\s]+$/.test(account.name) || account.name.length < 3 || account.name.length >= 25) {
    errors.name = 'El nombre debe contener de 3 a 25 caracteres, solo letras y números';
  }

  if (!account.phone || account.phone.length !== 10) {
    errors.phone = 'El número móvil debe tener exactamente 10 dígitos';
  }

  if (!account.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(account.email)) {
    errors.email = 'Ingrese una dirección de correo electrónico válida';
  } else if (account.email.length > 35) {
    errors.email = 'El correo electrónico no puede superar los 35 caracteres';
  }

  if (!account.password || !/.*\d+.*/.test(account.password)) {
    errors.password = 'La contraseña debe contener al menos un carácter numérico';
  } else if (account.password.length < 6 || account.password.length > 10) {
    errors.password = 'La contraseña debe tener una longitud entre 6 y 10 caracteres';
  }

  return errors;
};

export default validate;