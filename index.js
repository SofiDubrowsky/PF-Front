function laCajaDePandora(numero){
    let resto = numero % 2;
    if (resto === 0) {
      return numero.toString(2);
    } else {
      return numero.toString(16);
    }
}

const SofiDubrowsky = () => {
    const obj = {
        nombre: 'Sofia',
        edad: 26,
        nacionalidad: 'Argentina',
    }

    return obj;
}
