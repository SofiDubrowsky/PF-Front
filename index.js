function laCajaDePandora(numero){
  //proximamente escribiremos codigo aqui
  const parOImpar = numero % 2;
  if(parOImpar === 0) return numero.toString(2)
  if(parOImpar !== 0) return numero.toString(16)
}
