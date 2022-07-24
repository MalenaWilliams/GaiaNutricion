let ingresoMensual=parseInt(prompt ("Ingrese el total de sus ingresos mensuales"));
while (isNaN(ingresoMensual)) {
    ingresoMensual=prompt ("Ingrese el total de sus ingresos mensuales");
}
let porcentaje=parseInt(prompt ("Ingrese el porcentaje que desea ahorrar"));
while (isNaN(porcentaje) || (porcentaje >100)) {
    porcentaje=prompt ("Ingrese el porcentaje que desea ahorrar");
}

for(i=1;i<=12;i++) {
    console.log("En el mes "+i + " vas a ahorrar "+ ingresoMensual*i*porcentaje/100);
}
alert ("El " + porcentaje + "% de sus ingresos es " + ingresoMensual*porcentaje/100);
alert ( "Al año vas a tener ahorrados un total de " + ingresoMensual*12*porcentaje/100);
