const validate=(form)=>{
    let errors={};
    if (!form.name || !/^(?!^\s*$)[A-Za-z0-9\s]{3,25}$/.test(form.name)) {errors.name = "El titulo debe contener de 3 a 25 caracteres, solo letras y números";}
    if (!form.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {errors.email = 'Ingrese una dirección de correo electrónico válida';}
    if (!/^\d{10}$/.test(form.phone)) {errors.phone = 'El número móvil debe tener 10 dígitos';}
    if(!form.picture.length || form.picture.length > 1)errors.picture="Debe subir 1 foto";
    if (!form.address || !/^(?!^\s*$)[A-Za-z0-9\s]{3,25}$/.test(form.address)) {errors.address = "La dirección debe contener de 3 a 25 caracteres, solo letras y números";}
    if(!form.maps.length)errors.maps="Debe subir 1 mapa";
    return errors;
}
export default validate;