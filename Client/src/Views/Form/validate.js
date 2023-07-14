const validate=(form)=>{
    let errors={};
    if(!form.name || !/^[A-Za-z0-9\s]+$/.test(form.name) || form.name.length<3 || form.name.length>=25)errors.name="El titulo debe contener de 3 a 25 caracteres, solo letras y numeros";
    if(!form.description)errors.description ="Debe proporcionarse una descripcion de la actividad";
    if(!form.picture.length)errors.picture="Debe subir entre 1 y 3 fotos";
    if(!form.cost || form.cost<1 || !/^[0-9]+$/.test(form.cost))errors.cost="Debe proporcionarse un precio valido";
    if(!form.hours || form.hours.length<1)errors.hours="Debe seleccionarse al menos 1 horario";
    if(!form.days || form.days.length<1)errors.days="Debe seleccionarse al menos 1 dia";
    if(!form.players || form.players.length<1)errors.players="Debe seleccionarse al menos 1 opcion";
    if(!form.age || form.age.length<1)errors.age="Debe seleccionar al menos 1 opcion";
    if(!form.store || form.store.length<1)errors.store="Debe seleccionar al menos 1 opcion";
    return errors;
}
export default validate;