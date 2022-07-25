/*Indicador de sexo*/
let sexo= prompt("Ingrese su sexo").toLowerCase();
while (sexo!= "hombre" && sexo!= "varon" && sexo != "masculino" && sexo!="mujer" && sexo!="femenino") {
    sexo= prompt("Ingrese un sexo valido").toLowerCase();
} 
/*Indicador de peso*/
let peso=parseInt(prompt ("Ingrese su peso"));
while (isNaN(peso)) {
    peso=prompt ("Ingrese un peso valido");
}
/*Indicador de altura*/
let altura=parseInt(prompt ("Ingrese su altura en cm"));
while (isNaN(altura)) {
    altura=prompt ("Ingrese una altura valida");
}
/*Indicador de edad*/
let edad=parseInt(prompt ("Ingrese su edad"));
while (isNaN(edad)) {
    edad=prompt ("Ingrese una edad valida");
}
/*Indicador de actividad fisica realizada*/
let factorActividad=parseInt(prompt ("Ingrese el nivel de actividad fisica que realiza del 0 al 4, siendo 0 sedentaria y 4 atleta profesional"));
let actividad = 0
switch (factorActividad) {
    /*Sedentario*/
    case 0 :
    actividad= 1.2
    console.log (actividad)
    break;
    /*Poca actividad*/
    case 1:
    actividad= 1.375
    console.log (actividad)
    break;
    /*Actividad moderada*/
    case 2:
    actividad = 1.55
    console.log (actividad)
    break;
    /*Actividad intensa*/
    case 3:
    actividad= 1.735
    console.log (actividad)
    break;
    /*Atleta profesional*/
    case 4:
    actividad= 1.9
    console.log (actividad)
    break;
    /*Dato invalido*/
  default:
    alert ("Ingrese un dato valido");
}
/*Calculador de calorias Femenino*/
function CalculoFemenino(peso,altura,edad,actividad) {
    let calculo1= 655 + (9.6*peso) + (1.8*altura) - (4.7*edad);
    let calculo2= calculo1*actividad

    return calculo2
}
/*Calculador de calorias Masculino*/
function CalculoMasculino(peso,altura,edad,actividad) {
    let calculo1= 66 + (13.7*peso) + (5*altura) - (6.8*edad);
    let calculo2= calculo1*actividad

    return calculo2
}
/*Resultado de calorias Femenino*/
if (sexo== "mujer" || sexo== "femenino") { 
    const resultadoFemenino= CalculoFemenino(peso,altura,edad,actividad)
    alert ("El total de calorias diarias que debes consumir al dia segun los datos ingresados es de " + resultadoFemenino)
}
/*Resultado de calorias Masculino*/
else {
    const resultadoMasculino= CalculoMasculino(peso,altura,edad,actividad)
    alert ("El total de calorias diarias que debes consumir al dia segun los datos ingresados es de " + resultadoMasculino)
}

