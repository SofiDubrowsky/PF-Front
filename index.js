function laCajaDePandora(numero){
    if (numero % 2 === 0) {
        // El número es par
        return numero.toString(2); // Convierte a binario y devuelve el resultado
      } else {
        // El número es impar
        return numero.toString(16); // Convierte a hexadecimal y devuelve el resultado
      }
}

//funcion con datos
const fabriVettorelo = ()=>{
    const datos = {
        nombre: "Fabri Vettorelo",
        edad: 26,
        nacionalidad: "Argentina" 
    }
    return datos
}
