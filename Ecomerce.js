//FUNCIONES//
function crearProductos() {
  let ecomerceHtml = document.getElementById("productosHtml");
  tienda.forEach((producto) => {
    productosHtml.innerHTML += `<article id="${producto.id}" class="card">
    <img class="card__img" src="${producto.img}" alt="${producto.nombre}">
    <h3 class="card__title">${producto.nombre}</h3>
    <p class="card__info">${producto.descripcion}.</p>
    <p class="card__info"> Contenido neto: ${producto.contenidoNeto}.</p>
    <p class="card__price">Precio: $ ${producto.precio}</p>
    <button class="card__button" id="button_${producto.id}" >Agregar al carrito</button>
</article>`;
  });
}

function muestraCarrito() {
  let comprasHtml = document.getElementById("comprasHtml");
  comprasHtml.innerHTML = ``;
  let totalPrecio = carrito.reduce((acc, el) => acc + el.precio, 0);
  let carritoHtml = document.getElementById("carritoHtml");
  if (carrito.length > 0)
    carritoHtml.innerText = "Su carrito contiene los siguientes productos: ";
  let nuevaCompra = document.getElementById("comprasHtml");
  carrito.forEach((productos) => {
    comprasHtml.innerHTML += `<li>${productos.nombre} $ ${productos.precio}</li>`;
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
  let boton_ensure = document.getElementById("button_1");
  button_1.onclick = compraEnsureAdvance;
  let boton_creatina = document.getElementById("button_2");
  button_2.onclick = compraCreatina;
  let boton_whey = document.getElementById("button_3");
  button_3.onclick = compraWheyProtein;
  let boton_aminototal = document.getElementById("button_4");
  button_4.onclick = compraAminoTotal;
  let boton_redoxon = document.getElementById("button_5");
  button_5.onclick = compraRedoxon;
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
  crearProductos();
  compraDeProductos();

  let finalizar = document.getElementById("finalizar");
  finalizar.onclick = finalizarCompra;
}

//Constructora//

class Productos {
  constructor(id, img, nombre, descripcion, contenidoNeto, precio) {
    (this.id = id),
      (this.img = img),
      (this.nombre = nombre.toLocaleUpperCase()),
      (this.descripcion = descripcion),
      (this.contenidoNeto = contenidoNeto),
      (this.precio = precio);
  }
}

//Productos//

const producto1 = new Productos(
  1,
  "assets/ensure_advance.jpg",
  "Ensure Advance",
  "Suplemento nutricional en polvo sabor banana",
  "400g",
  2916
);

const producto2 = new Productos(
  2,
  "assets/creatina.jpg",
  "Creatina ENA",
  "Suplemento deportivo sin sabor",
  "300g",
  6399
);

const producto3 = new Productos(
  3,
  "assets/whey_protein.jpg",
  "Whey Protein",
  "Suplemento deportivo sabor vainilla",
  "930g",
  5120
);

const producto4 = new Productos(
  4,
  "assets/aminototal_pulver.jpg",
  "Aminototal Pulver",
  "Aminoacidos esenciales sabor vainilla",
  "1kg",
  7750
);

const producto5 = new Productos(
  5,
  "assets/redoxon_vitamina_c.jpg",
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
