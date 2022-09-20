//FUNCIONES//
//Capturar datos para "Calculadora de Calorias Diarias" (Edad, Peso, Altura y Actividad fisica realizada)//

//EDAD//
function edad() {
  let valorEdad = document.getElementById("edad");
  let edadValue = valorEdad.value;

  return edadValue;
}

//PESO//
function peso() {
  let valorPeso = document.getElementById("peso");
  let pesoValue = valorPeso.value;

  return pesoValue;
}

//ALTURA//
function altura() {
  let valorAltura = document.getElementById("altura");
  let alturaValue = valorAltura.value;

  return alturaValue;
}

//ACTIVIDAD FISICA//
function actividad() {
  let factorActividad = 0;
  let elementoActivo = document.querySelector(
    'input[name="actividadFisica"]:checked'
  );
  if (elementoActivo) {
    factorActividad = elementoActivo.value;
    console.log(factorActividad);
  }
  return factorActividad;
}

// Calculador de calorias FEMENINO con los datos capturados//

function calculoFemenino(pesoValue, alturaValue, edadValue, factorActividad) {
  let calculo1 = 655 + 9.6 * pesoValue + 1.8 * alturaValue - 4.7 * edadValue;
  let calculo2 = calculo1 * factorActividad;

  return calculo2;
}

//Calculador de calorias MASCULINO con los datos capturados//

function calculoMasculino(pesoValue, alturaValue, edadValue, factorActividad) {
  let calculo1 = 66 + 13.7 * pesoValue + 5 * alturaValue - 6.8 * edadValue;
  let calculo2 = calculo1 * factorActividad;

  return calculo2;
}

//Calculadora de calorias diarias segun sexo seleccionado//

function calculadoraDeCalorias() {
  const form = document.getElementById("form");
  let elementoActivo = document.querySelector('input[name="sexo"]:checked');

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    return false;
  });

  if (elementoActivo.value == "femenino") {
    return calculoFemenino(peso(), altura(), edad(), actividad()).toFixed(0);
  } else {
    return calculoMasculino(peso(), altura(), edad(), actividad()).toFixed(0);
  }
}

//Capturar datos para "IMC" (Peso y Altura)//

//PESO IMC//
function pesoImc() {
  let valorPeso = document.getElementById("pesoImc");
  let pesoValue = valorPeso.value;

  return pesoValue;
}

//ALTURA IMC//
function alturaImc() {
  let valorAltura = document.getElementById("alturaImc");
  let alturaValue = valorAltura.value;

  return alturaValue;
}

//Calculador de IMC mediante los datos capturados//

function imc(pesoValue, alturaValue) {
  let calculoImc = pesoValue / (alturaValue * alturaValue);
  return calculoImc.toFixed(2);
}

//Codigo de "POPPER"//

const button = document.querySelector("#button");
const tooltip = document.querySelector("#tooltip");
const arrow = document.querySelector("#arrow");

function show() {
  tooltip.setAttribute("data-show", "");

  popperInstance.setOptions((options) => ({
    ...options,
    modifiers: [...options.modifiers, { name: "eventListeners" }],
  }));
}

//Posicion de IMC y Popper correspondiente segun el resultado//
function popperImc() {
  const imcCalculo = imc(pesoImc(), alturaImc());
  const flecha = document.getElementById("arrow");
  const imcsData = [
    //Delgadez Extrema//
    {
      elemento: document.getElementById("imc1"),
      pesoMinimo: 1,
      pesoMaximo: 15.9,
      flechaMarginLeft: "-73px",
      popperOffset: [-170, 110],
    },
    //Delgadez //
    {
      elemento: document.getElementById("imc2"),
      pesoMinimo: 15.9,
      pesoMaximo: 18.5,
      flechaMarginLeft: "-68px",
      popperOffset: [-92, 110],
    },
    //Saludable//
    {
      elemento: document.getElementById("imc3"),
      pesoMinimo: 18.5,
      pesoMaximo: 24.9,
      flechaMarginLeft: "-3px",
      popperOffset: [-2, 110],
    },
    //Sobrepeso//
    {
      elemento: document.getElementById("imc4"),
      pesoMinimo: 24.9,
      pesoMaximo: 29.9,
      flechaMarginLeft: "79px",
      popperOffset: [80, 110],
    },
    //Obesidad//
    {
      elemento: document.getElementById("imc5"),
      pesoMinimo: 29.9,
      pesoMaximo: 100,
      flechaMarginLeft: "78px",
      popperOffset: [170, 110],
    },
  ];

  imcsData.forEach((data) => {
    data.elemento.style.color = "transparent";
  });

  let foundImcData = imcsData.find(
    (data) => imcCalculo >= data.pesoMinimo && imcCalculo < data.pesoMaximo
  );

  //Alert para cuando los datos estan incompletos o el resultado da 0//

  if (!foundImcData) {
    Swal.fire({
      title: "No fue posible realizar el calculo",
      text: "Complete todos los datos solicitados y vuelva a intentar",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  //Popper correspondiente para cada caso//
  else {
    foundImcData.elemento.style.color = "blueviolet";
    foundImcData.elemento.innerText = `IMC: ${imcCalculo}`;
    flecha.style.marginLeft = foundImcData.flechaMarginLeft;
    popperInstance = Popper.createPopper(button, tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: foundImcData.popperOffset,
          },
        },
      ],
    });
    show();
  }
}

//Funcion "Calculadora" principal que ejecuta todas las demas funciones cuando corresponde//

function calculadora() {
  darkMode();
  const calculoCalorias = document.getElementById("calcular");
  const calculoImc = document.getElementById("button");
  calculoCalorias.onclick = () => {
    Swal.fire({
      title: `Calorias: ${calculadoraDeCalorias()}`,
      text: "¡Ahora ya sabes cuantas calorias debes consumir a diario!",
      confirmButtonText: "Genial!",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };
  calculoImc.onclick = () => {
    popperImc();
  };
}

//Ejecucion de la funcion principal "Calculadora"//
calculadora();
