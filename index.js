function laCajaDePandora(numero){
  if(numero % 2 === 0){
    return numero.toString(2)
  }else{
    return numero.toString(16);
  }
}

const nadiaMartel = () =>{
  const datos = {
    nombre: "Nadia Martel",
    nacionalidad: "Argentina",
    edad: 32
  };
  return datos
}
