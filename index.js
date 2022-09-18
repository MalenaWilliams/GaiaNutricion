                                //FUNCIONES//
//Dark Mode//
function darkMode() {
  let dark = document.getElementById("btnDark");
  let darkMode = localStorage.getItem("darkMode");

  if (darkMode == "dark") {
    document.body.classList.add("darkMode");
    dark.innerHTML = `<img class="dark" src="assets/ligth.png" alt="">`;
  } else {
    document.body.classList.remove("darkMode");
  }
  
  dark.addEventListener("click", () => {
    if (darkMode != "dark") {
      document.body.classList.add("darkMode");
      localStorage.setItem("darkMode", "dark");
      darkMode = "dark";
      dark.innerHTML = `<img class="dark" src="assets/ligth.png" alt="">`;
    } else {
      document.body.classList.remove("darkMode");
      localStorage.setItem("darkMode", "ligth");
      darkMode = "light";
      dark.innerHTML = `<img class="dark" src="assets/dark.png" alt="">`;
    }
  });
}

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
  let imcCalculo = imc(pesoImc(), alturaImc());
  const imcUno = document.getElementById("imc1");
  const imcDos = document.getElementById("imc2");
  const imcTres = document.getElementById("imc3");
  const imcCuatro = document.getElementById("imc4");
  const imcCinco = document.getElementById("imc5");
  const flecha = document.getElementById("arrow");
  const datos = document.getElementById("tooltip")
  const showEvents = ["click"];
  imcCuatro.style.color = "transparent";
  imcDos.style.color = "transparent";
  imcTres.style.color = "transparent";
  imcCinco.style.color = "transparent";
  imcUno.style.color = "transparent";

  //Alert para cuando los datos estan incompletos o el resultado da 0//

  if (imc(pesoImc(), alturaImc()) == Infinity || pesoImc() == 0 || alturaImc() == 0) {
    Swal.fire({
      title: "No fue posible realizar el calculo",
      text: "Complete todos los datos solicitados y vuelva a intentar",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }

 //Posicion de IMC y Popper para el resultado: "Delgadez Extrema"//

  else if (imc(pesoImc(), alturaImc()) < 15.9) {
    imcUno.style.color = "blueviolet";
    imcUno.innerText = `IMC: ${imcCalculo}`;
    flecha.style.marginLeft = "-73px";
    popperInstance = Popper.createPopper(button, tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [-170, 110],
          },
        },
      ],
    });
    show()

    //Posicion de IMC y Popper para el resultado: "Delgadez"//

  } else if (
    imc(pesoImc(), alturaImc()) >= 15.9 &&
    imc(pesoImc(), alturaImc()) < 18.5
  ) {
    imcDos.style.color = "blueviolet";
    imcDos.innerText = `IMC: ${imcCalculo}`;
    flecha.style.marginLeft = "-68px";
    popperInstance = Popper.createPopper(button, tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [-92, 110],
          },
        },
      ],
    });
    show()

    //Posicion de IMC y Popper para el resultado: "Saludable"//

  } else if (
    imc(pesoImc(), alturaImc()) >= 18.5 &&
    imc(pesoImc(), alturaImc()) < 24.9
  ) {
    imcTres.style.color = "blueviolet";
    imcTres.innerText = `IMC: ${imcCalculo}`;
    flecha.style.marginLeft = "3px";
    popperInstance = Popper.createPopper(button, tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [-2, 110],
          },
        },
      ],
    });
    show()

    //Posicion de IMC y Popper para el resultado: "Sobrepeso"//

  } else if (
    imc(pesoImc(), alturaImc()) >= 24.9 &&
    imc(pesoImc(), alturaImc()) < 29.9
  ) {
    imcCuatro.style.color = "blueviolet";
    imcCuatro.innerText = `IMC: ${imcCalculo}`;
    flecha.style.marginLeft = "79px";
    popperInstance = Popper.createPopper(button, tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [80, 110],
          },
        },
      ],
    });
    show()

    //Posicion de IMC y Popper para el resultado: "Obesidad"//

  } else if (imc(pesoImc(), alturaImc()) >= 29.9) {
    imcCinco.style.color = "blueviolet";
    imcCinco.innerText = `IMC: ${imcCalculo}`;
    flecha.style.marginLeft = "78px";
    popperInstance = Popper.createPopper(button, tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [170, 110],
          },
        },
      ],
    });
    show()
  } 

}

//Funcion "Calculadora" principal que ejecuta todas las demas funciones cuando corresponde//

function calculadora () {
  darkMode();
  const calculoCalorias = document.getElementById("calcular");
  const calculoImc = document.getElementById("button");
  calculoCalorias.onclick = () => {
    Swal.fire({
      title: `Calorias: ${calculadoraDeCalorias()}`,
      text: '¡Ahora ya sabes cuantas calorias debes consumir a diario!',
      confirmButtonText:
      'Genial!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  };
  calculoImc.onclick = () => {
    popperImc();
  };
}

//Ejecucion de la funcion principal "Calculadora"//
calculadora ()











