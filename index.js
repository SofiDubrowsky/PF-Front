//funcion con datos
function laCajaDePandora(numero){
  if(numero % 2 === 0){
    return numero.toString(2)
  }else{
    return numero.toString(16);
  }
}

const juanMora = () =>{
  const datos = {
    nombre: "Juan Pablo Mora",
    nacionalidad: "México",
    edad: 27
  };
  return datos
}
