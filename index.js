// /*Funcion Calculadora de Calorias*/

// // function calculadoraDeCalorias() {
// //   let factorActividad = parseInt(
// //     prompt(
// //       "Ingrese el nivel de actividad fisica que realiza del 0 al 4, siendo 0 sedentaria y 4 atleta profesional"
// //     )
// //   );

// //   let actividad = 0;

// //   switch (factorActividad) {
// //     //Sedentario
// //     case 0:
// //       actividad = 1.2;
// //       console.log(actividad);
// //       break;
// //     //Poca actividad
// //     case 1:
// //       actividad = 1.375;
// //       console.log(actividad);
// //       break;
// //     //Actividad moderada
// //     case 2:
// //       actividad = 1.55;
// //       console.log(actividad);
// //       break;
// //     //Actividad intensa
// //     case 3:
// //       actividad = 1.735;
// //       console.log(actividad);
// //       break;
// //     //Atleta profesional
// //     case 4:
// //       actividad = 1.9;
// //       console.log(actividad);
// //       break;
// //     //Dato invalido
// //     default:
// //       alert("Ingrese un dato valido");
// //   }

// //   preguntarDatos(actividad);
// // }

// // calculadoraDeCalorias();

// // function preguntarDatos(actividad) {
// //   /*Indicador de sexo*/
// //   let sexo = prompt("Ingrese su sexo").toLowerCase();
// //   while (
// //     sexo != "hombre" &&
// //     sexo != "varon" &&
// //     sexo != "masculino" &&
// //     sexo != "mujer" &&
// //     sexo != "femenino"
// //   ) {
// //     sexo = prompt("Ingrese un sexo valido").toLowerCase();
// //   }

// //   /*Indicador de peso*/
// //   let peso = parseInt(prompt("Ingrese su peso"));
// //   while (isNaN(peso)) {
// //     peso = prompt("Ingrese un peso valido");
// //   }

// //   /*Indicador de altura*/
// //   let altura = parseInt(prompt("Ingrese su altura en cm"));
// //   while (isNaN(altura)) {
// //     altura = prompt("Ingrese una altura valida");
// //   }

// //   /*Indicador de edad*/
// //   let edad = parseInt(prompt("Ingrese su edad"));
// //   while (isNaN(edad)) {
// //     edad = prompt("Ingrese una edad valida");
// //   }

// //   if (sexo == "mujer" || sexo == "femenino") {
// //     console.log(
// //       `Calculadora harris benedict, mujer: ${calculoFemenino(
// //         peso,
// //         altura,
// //         edad,
// //         actividad
// //       )} `
// //     );
// //     alert(
// //       `El total de calorias diarias que debes consumir segun los datos ingresados es de: ${calculoFemenino(
// //         peso,
// //         altura,
// //         edad,
// //         actividad
// //       )}`
// //     );
// //   } else {
// //     console.log(
// //       `Calculadora harris benedict, hombre: ${calculoMasculino(
// //         peso,
// //         altura,
// //         edad,
// //         actividad
// //       )} `
// //     );
// //     alert(
// //       `El total de calorias diarias que debes consumir segun los datos ingresados es de: ${calculoMasculino(
// //         peso,
// //         altura,
// //         edad,
// //         actividad
// //       )}`
// //     );
// //   }
// // }
function edad() {
  let valorEdad = document.getElementById("edad");
  let edadValue = valorEdad.value;
  sessionStorage.setItem(`edadGuardada`, edadValue);
  let edadGuardada = sessionStorage.getItem(`edadGuardada`);

  return edadGuardada;
}

function peso() {
  let valorPeso = document.getElementById("peso");
  let pesoValue = valorPeso.value;
  sessionStorage.setItem(`pesoGuardado`, pesoValue);
  let pesoGuardado = sessionStorage.getItem(`pesoGuardado`);

  return pesoGuardado;
}

function altura() {
  let valorAltura = document.getElementById("altura");
  let alturaValue = valorAltura.value;
  sessionStorage.setItem(`alturaGuardada`, alturaValue);
  let alturaGuardada = sessionStorage.getItem(`alturaGuardada`);

  return alturaGuardada;
}

function calculadoraDeCalorias() {
  let elementoActivo = document.querySelector('input[name="sexo"]:checked');
  if (elementoActivo.value == femenino) {
    calculoFemenino(pesoValue, alturaValue, edadValue, factorActividad);
  } else {
    calculoMasculino(pesoValue, alturaValue, edadValue, factorActividad);
  }
}
function calculo() {
  calculadoraDeCalorias();
}

let cal = document.getElementById("calcular");
cal.onclick = actividad;

function s() {
  let elementoActivo = document.querySelector('input[name="sexo"]:checked');
  if (elementoActivo) {
    alert(elementoActivo.value);
  } else {
    alert("No hay ninún elemento activo");
  }
}

function actividad() {
  let factorActividad = 0;
  let elementoActivo = document.querySelector(
    'input[name="actividadFisica"]:checked'
  );
  if (elementoActivo) {
    factorActividad = elementoActivo.value;
    alert(factorActividad);
  }
  // let leve = document.querySelector('input[name="actividadFisica"]:checked');
  // if (leve) {
  //   factorActividad = leve.value;
  //   console.log(leve);
  // }
  // let moderada = querySelector('input[name="actividadFisica"]:checked');
  // if (moderada) {
  //   factorActividad = moderada.value;
  //   console.log(moderada);
  // }
  // let intensa = querySelector('input[name="actividadFisica"]:checked');
  // if (intensa) {
  //   factorActividad = intensa.value;
  //   console.log(intensa);
  // }
  // let profecional = querySelector('input[name="actividadFisica"]:checked');
  // if (profecional) {
  //   factorActividad = profecional.value;
  //   console.log(profecional);
  // }
  return factorActividad;

  // sedentario.addEventListener

  // leve.addEventListener("checked", (factorActividad = leve.value));

  // moderada.addEventListener("checked", (factorActividad = moderada.value));

  // intensa.addEventListener("checked", (factorActividad = intensa.value));

  // profecional.addEventListener(
  //   "checked",
  //   (factorActividad = profecional.value)
  // );

  // return factorActividad;
}

// Calculador de calorias Femenino

function calculoFemenino(pesoValue, alturaValue, edadValue, factorActividad) {
  let calculo1 = 655 + 9.6 * pesoValue + 1.8 * alturaValue - 4.7 * edadValue;
  let calculo2 = calculo1 * factorActividad;

  return calculo2;
}
// const calculoFemenino = (peso, altura, edad, actividad) => {
//   let calculo1 = 655 + 9.6 * peso + 1.8 * altura - 4.7 * edad;
//   let calculo2 = calculo1 * actividad;
//   console.log(calculo2);
//   return calculo2;
// };

//Calculador de calorias Masculino
function calculoMasculino(pesoValue, alturaValue, edadValue, factorActividad) {
  let calculo1 = 66 + 13.7 * pesoValue + 5 * alturaValue - 6.8 * edadValue;
  let calculo2 = calculo1 * factorActividad;

  return calculo2;
}
altura();
peso();
edad();

mostrarEnConsola = peso();
console.log(mostrarEnConsola);
