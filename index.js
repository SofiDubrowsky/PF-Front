function laCajaDePandora(numero){
  //proximamente escribiremos codigo aqui
  

    switch (numero % 2) {
        case 0:
            return numero.toString(2);
        default:
            return numero.toString(16);

    }
}

