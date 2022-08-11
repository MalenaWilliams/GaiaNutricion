//Funciones//
function muestraCarrito() {
  let comprasHtml = document.getElementById("comprasHtml");
  comprasHtml.innerHTML = ``;
  let totalPrecio = carrito.reduce((acc, el) => acc + el.precio, 0);
  let carritoHtml = document.getElementById("carritoHtml");
  if (carrito.length > 0)
    carritoHtml.innerText = "Su carrito contiene los siguientes productos: ";
  let nuevaCompra = document.getElementById("comprasHtml");
  carrito.forEach((producto) => {
    comprasHtml.innerHTML += `<li>${producto.nombre} $ ${producto.precio}</li>`;
  });
  let totalHtml = document.getElementById("totalHtml");
  if (carrito.length > 0)
    totalHtml.innerText = `El total de su compra es de $ ${totalPrecio}`;
}

function compraEnsureAdvance() {
  carrito.push(producto1);
  muestraCarrito();
}

function compraCreatina() {
  carrito.push(producto2);
  muestraCarrito();
}

function compraWheyProtein() {
  carrito.push(producto3);
  muestraCarrito();
}

function compraAminoTotal() {
  carrito.push(producto4);
  muestraCarrito();
}

function compraRedoxon() {
  carrito.push(producto5);
  muestraCarrito();
}

function compraDeProductos() {
  let boton_ensure = document.getElementById("boton_ensure");
  boton_ensure.onclick = compraEnsureAdvance;
  let boton_creatina = document.getElementById("boton_creatina");
  boton_creatina.onclick = compraCreatina;
  let boton_whey = document.getElementById("boton_whey");
  boton_whey.onclick = compraWheyProtein;
  let boton_aminototal = document.getElementById("boton_aminototal");
  boton_aminototal.onclick = compraAminoTotal;
  let boton_redoxon = document.getElementById("boton_redoxon");
  boton_redoxon.onclick = compraRedoxon;
}

function finalizarCompra() {
  let totalPrecio = carrito.reduce((acc, el) => acc + el.precio, 0);
  const compras = carrito.map((el) => el.nombre);

  alert(
    "Usted compro: " +
      compras +
      " por el precio final de $ " +
      totalPrecio +
      ". ¡Muchas gracias! Vuelva pronto."
  );
}

function ecommerce() {
  compraDeProductos();

  let finalizar = document.getElementById("finalizar");
  finalizar.onclick = finalizarCompra;
}

//Constructora//

class Productos {
  constructor(id, nombre, descripcion, contenidoNeto, precio) {
    (this.id = id),
      (this.nombre = nombre.toLocaleUpperCase()),
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
  "Aminoacidos esenciales sabor vainilla",
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
console.log(tienda);

const carrito = [];

ecommerce();
