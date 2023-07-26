const validate=(form)=>{
    let errors={};
    if (form.points === 0 ) {errors.points = "Debes dar una claificacion de  1 a 5 estrellas";}
    if (form.description === '' || !/^(?!\s*$).*/.test(form.description)) {
        errors.description = "Debes ingresar una descripción";
      }
    return errors;
}
export default validate;