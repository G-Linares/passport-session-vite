process.on("message", (number) => {
  const resultingArray = probabilityInArray(number);
  process.send(resultingArray); // <---- manda el resultado al padre
});

const probabilityInArray = (number) => {
  // <--- funcion que genera Array
  let numeros = [];
  let objetoNumeros = [];
  const generarNumeros = () => {
    for (let i = 0; i < number; i++) {
      numeros.push(parseInt(Math.random() * 20 + 1));
    }
    verificar();
  };
  const verificar = () => {
    // <--- funcion que valida el array y regresa resultado
    let contador = 0;
    let indice;
    for (let j = 1; j <= 20; ) {
      indice = numeros.indexOf(j);
      if (indice != -1) {
        contador++;
        numeros.splice(indice, 1);
      } else {
        objetoNumeros.push({ [j]: contador });
        contador = 0;
        j++;
      }
    }
  };
  generarNumeros();
  return objetoNumeros;
};
