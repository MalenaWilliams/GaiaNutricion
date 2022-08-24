//Constructora//

class Producto {
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

const tienda = [
  new Producto(
    1,
    "assets/ensure_advance.jpg",
    "Ensure Advance",
    "Suplemento nutricional sabor banana",
    "400g",
    2916
  ),
  new Producto(
    2,
    "assets/creatina.jpg",
    "Creatina ENA",
    "Suplemento deportivo sin sabor",
    "300g",
    6399
  ),

  new Producto(
    3,
    "assets/whey_protein.jpg",
    "Whey Protein",
    "Suplemento deportivo sabor vainilla",
    "930g",
    5120
  ),

  new Producto(
    4,
    "assets/aminototal_pulver.jpg",
    "Aminototal Pulver",
    "Aminoacidos esenciales sabor vainilla",
    "1kg",
    7750
  ),

  new Producto(
    5,
    "assets/redoxon_vitamina_c.jpg",
    "Redoxon Vitamina C",
    "Suplemento efervescente sabor naranja",
    "30g",
    1520
  ),
];

//Arrays//

console.log(...tienda);

//FUNCIONES//

function mostrarProducts() {
  const sectionEcommerce = document.getElementById("productsHtml");

  sectionEcommerce.innerHTML = "";

  tienda.forEach((product) => {
    const eCommerceHtml = document.createElement("article");
    eCommerceHtml.className = "card";
    eCommerceHtml.innerHTML += `
                <img class="card__img" src="${product.img}" alt="${
      product.nombre
    }">
                <h3 class="card__title">${product.nombre}</h3>
                <p class="card__info">${product.descripcion}.</p>
                <p class="card__info"> Contenido neto: ${
                  product.contenidoNeto
                }.</p>
                <p class="card__price${
                  product.precio < 3000 ? "-oferta" : "-comun"
                }">Precio: $ ${product.precio}</p>
                <button class="card__button" id="button_${
                  product.id
                }">Agregar al carrito</button>
        `;
    sectionEcommerce.appendChild(eCommerceHtml);

    const card__button = document.getElementById(`button_${product.id}`);
    card__button.addEventListener("click", () => {
      agregarAlCarrito(product);
      actualizarCarrito();
    });
  });
}

function agregarAlCarrito(product) {
  carrito.push(product);
  guardarEnStorage(carrito);
}

function actualizarCarrito() {
  traerDelStorage();
  const comprasHtml = document.getElementById("comprasHtml");
  const totalHtml = document.getElementById("totalHtml");
  const carritoHtml = document.getElementById("carritoHtml");

  comprasHtml.innerHTML = "";

  if (carrito.length == 0) {
    totalHtml.innerText = "";
    carritoHtml.innerText = "Su carrito esta vacio";
  } else {
    carritoHtml.innerText = "Su carrito contiene los siguientes productos: ";
    carrito.forEach((product, index) => {
      const div = document.createElement("div");
      const productDetailElement = document.createElement("li");
      productDetailElement.textContent = `${product.nombre} $${product.precio}`;

      const removeProductElement = document.createElement("img");
      div.className = "contenedor";
      removeProductElement.className = "quitar_producto";
      removeProductElement.src = "assets/quitar.png";
      removeProductElement.addEventListener("click", () => {
        carrito.splice(index, 1);
        guardarEnStorage(carrito);
        actualizarCarrito();
      });

      div.appendChild(productDetailElement);
      div.appendChild(removeProductElement);
      comprasHtml.appendChild(div);
    });

    const totalPrecio = carrito.reduce((acc, el) => acc + el.precio, 0);
    totalHtml.innerText = `El total de su compra es de $ ${totalPrecio}`;
    return totalPrecio;
  }
}

function guardarEnStorage(lista) {
  localStorage.setItem(`tiendaStorage`, JSON.stringify(lista));
}

function traerDelStorage() {
  let listaATraer = localStorage.getItem(`tiendaStorage`);
  listaATraer = (carrito = JSON.parse(listaATraer)) || [];
}

function finalizarCompra() {
  const precioFinal = actualizarCarrito();
  const compras = carrito.map((el) => el.nombre);
  if (carrito.length > 3) {
    const [, , tercerProducto] = carrito;
    const { nombre, precio } = tercerProducto;
    Swal.fire({
      title: "Su compra fue realizada con exito",
      text: `Usted compro: ${compras} por el precio final de $${
        precioFinal - precio / 2
      } ya que otuviste un descuento sorpresa del 50% en tu tercer producto "${nombre}" por realizar una compra mayor a 3 productos.
      ¡Muchas gracias! Vuelva pronto.`,
      icon: "éxito",
      confirmButtonText: "Genial!",
    });
  } else {
    alert(
      `Usted compro: ${compras} por el precio final de $${precioFinal}. 
            ¡Muchas gracias! Vuelva pronto.
        `
    );
  }
}

function eCommerce() {
  mostrarProducts();
  actualizarCarrito();

  const finalizar = document.getElementById("finalizar");
  finalizar.addEventListener("click", finalizarCompra);
}
eCommerce();
