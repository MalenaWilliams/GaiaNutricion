//Funcion Carrito//
function compraDeProductos() {
  let compra = prompt("Ingrese el producto deseado").toLocaleLowerCase();

  if (compra == producto1.nombre) {
    carrito.push(producto1);
  } else if (compra == producto2.nombre) {
    carrito.push(producto2);
  } else if (compra == producto3.nombre) {
    carrito.push(producto3);
  } else if (compra == producto4.nombre) {
    carrito.push(producto4);
  } else if (compra == producto5.nombre) {
    carrito.push(producto5);
  } else {
    alert("El producto solicitado no esta disponible, intentelo nuevamente");
    compra = prompt("Ingrese el producto deseado").toLocaleLowerCase();
  }
}

//Constructora//

class Productos {
  constructor(id, nombre, descripcion, contenidoNeto, precio) {
    (this.id = id),
      (this.nombre = nombre.toLocaleLowerCase()),
      (this.descripcion = descripcion),
      (this.contenidoNeto = contenidoNeto),
      (this.precio = precio);
  }
}

//Productos//

const producto1 = new Productos(
  1,
  "Ensure Advance",
  "Suplemento nutricional en polvo sabor banana",
  "400g",
  2916
);

const producto2 = new Productos(
  2,
  "Creatina Micronizada ENA",
  "Suplemento deportivo sin sabor",
  "300g",
  6399
);

const producto3 = new Productos(
  3,
  "Whey Protein",
  "Suplemento deportivo sabor vainilla",
  "930g",
  5120
);

const producto4 = new Productos(
  4,
  "Aminototal Pulver",
  "Aminoacidos esenciales sabor frutilla",
  "1kg",
  7750
);

const producto5 = new Productos(
  5,
  "Redoxon Vitamina C",
  "Suplemento efervescente sabor naranja",
  "30g",
  1520
);

//Arrays//

const tienda = [producto1, producto2, producto3, producto4, producto5];

const nombres = tienda.map((el) => el.nombre);

const productosDeportivos = tienda.slice(1, 3);

const carrito = [];

//ConsoleLog//

console.log(tienda);

console.log(
  "De todos los productos de nuestra tienda, dos son suplementos deportivos y se muestran a continuacion: "
);
productosDeportivos.forEach((producto) => {
  console.log("- " + producto.nombre + ".");
});

//Presentacion de productos al usuario//

alert("los productos disponibles son: " + nombres);

//Compra de productos//

compraDeProductos();

let totalPrecio = carrito.reduce((acc, el) => acc + el.precio, 0);

let continuo = prompt(
  "Usted esta comprando " +
    carrito.length +
    " producto por la cantidad de " +
    totalPrecio +
    " ¿Desea realizar otra compra?"
).toLocaleLowerCase();

console.log(carrito);

while (continuo == "si") {
  alert("los productos disponibles son: " + nombres);

  compraDeProductos();

  totalPrecio = carrito.reduce((acc, el) => acc + el.precio, 0);

  continuo = prompt(
    "Usted esta comprando " +
      carrito.length +
      " productos por la cantidad de " +
      totalPrecio +
      " ¿Desea realizar otra compra?"
  ).toLocaleLowerCase();
}
const compras = carrito.map((el) => el.nombre);

alert(
  "Usted compro: " +
    compras +
    " por el precio final de $ " +
    totalPrecio +
    ". ¡Muchas gracias! Vuelva pronto."
);
