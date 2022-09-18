//Constructora//
class Producto {
  constructor(id, img, nombre, descripcion, contenidoNeto, precio, categoria) {
    (this.id = id),
      (this.img = img),
      (this.nombre = nombre.toLocaleUpperCase()),
      (this.descripcion = descripcion),
      (this.contenidoNeto = contenidoNeto),
      (this.precio = precio),
      (this.categoria = categoria);
  }
}

//Arrays//

let tienda = [];
let historialarray = [];

//Fetch de Productos.json//

fetch("productos.json")
  .then((response) => response.json())
  .then((data) => {
    for (let product of data) {
      let productoNuevo = new Producto(
        product.id,
        product.img,
        product.nombre,
        product.descripcion,
        product.contenidoNeto,
        product.precio,
        product.categoria
      );
      tienda.push(productoNuevo);
    }
    mostrarProducts();
  });

//FUNCIONES//

//Dark Mode//
function darkMode() {
  let dark = document.getElementById("btnDark");
  let darkMode = localStorage.getItem("darkMode");

  if (darkMode == "dark") {
    document.body.classList.add("darkMode");
    dark.innerHTML = `<img class="dark" src="assets/ligth.png" alt="">`;
  } else {
    document.body.classList.remove("darkmode");
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

//Funciones que crean el HTML del E-comerce//

function mostrarProducts() {
  traerDelHistorial();
  Historial();

  const sectionEcommerce = document.getElementById("productsHtml");

  sectionEcommerce.innerHTML = "";

  tienda.forEach((product) => {
    const eCommerceHtml = document.createElement("article");
    eCommerceHtml.className = "cards";
    eCommerceHtml.innerHTML += `
              <img class="cards__img" src="${product.img}" alt="${
      product.nombre
    }">
              <h3 id= "ve" class="cards__titulo">${product.nombre}</h3>
              <p class="cards__info">${product.descripcion}.</p>
              <p class="cards__info"> Contenido neto: ${
                product.contenidoNeto
              }.</p>
              <p class="cards__precio${
                product.precio < 3000 ? "-oferta" : "-comun"
              }">Precio: $ ${product.precio}</p>
              <button class="btn btn-bd-primary" id="button_${
                product.id
              }">Agregar al carrito</button>
      `;
    sectionEcommerce.appendChild(eCommerceHtml);

    const card__button = document.getElementById(`button_${product.id}`);
    contadorCarrito();
    card__button.addEventListener("click", () => {
      agregarAlCarrito(product);
      actualizarCarrito();
      contadorCarrito();
    });
  });
}

//FUNCIONES DEL CARRITO://

//Funcion que coloca un contador en el carrito//

function contadorCarrito() {
  const contador = carrito.reduce((acc, el) => acc + el.cantidad, 0);
  const productosEnCarrito = document.getElementById("btnCarrito");
  if (contador == 0) {
    productosEnCarrito.style.display = "none";
  } else {
    productosEnCarrito.textContent = `${contador}`;
    productosEnCarrito.style.display = "flex";
    localStorage.setItem("contador", contador);
  }
}

//Funcion que coloca un nuevo producto en el carrito//

function agregarAlCarrito(product) {
  const productIndex = carrito.findIndex((someProduct) => {
    return product.id === someProduct.id;
  });

  if (productIndex == -1) {
    carrito.push({
      ...product,
      cantidad: 1,
    });
  } else {
    const productoEnCarrito = carrito[productIndex];
    carrito[productIndex].cantidad = productoEnCarrito.cantidad + 1;
  }
  contadorCarrito();
  Toastify({
    text: `Producto añadido al carrito`,
    duration: 1000,
    style: {
      background: "rgba(0, 255, 128, 0.356)",
      color: "black",
    },
  }).showToast();

  guardarEnStorage(carrito);
  contadorCarrito();
}

//Actualizacion del carrito//

function actualizarCarrito() {
  traerDelStorage();
  const vaciarBtn = document.getElementById("vaciar");
  const comprasHtml = document.getElementById("comprasHtml");
  const totalHtml = document.getElementById("totalHtml");
  const carritoHtml = document.getElementById("carritoHtml");

  comprasHtml.innerHTML = "";

  if (carrito.length == 0) {
    totalHtml.innerText = "";
    carritoHtml.innerText = "Su carrito esta vacio";
    vaciarBtn.style.display = "none";
  } else {
    //Carrito modal//
    vaciarBtn.style.display = "flex";
    carritoHtml.innerText = "Su carrito contiene los siguientes productos: ";

    carrito.forEach((product, index) => {
      const div = document.createElement("div");
      div.className = "contenedor";

      const productDetailElement = document.createElement("div");
      productDetailElement.className = "contenedor";
      productDetailElement.innerHTML = `<img class="carrito__img" src="${
        product.img
      }" alt="${product.nombre}"></img>
      <li class="">${product.cantidad} ${product.nombre} $${
        product.precio * product.cantidad
      }</li>
      `;

      //Quitar del carrito //

      const removeProductElement = document.createElement("button");
      removeProductElement.className = "btn btn-outline-secondary btn-sm";
      removeProductElement.textContent = "-";
      removeProductElement.addEventListener("click", () => {
        if (product.cantidad > 1) {
          product.cantidad = product.cantidad - 1;
        } else {
          carrito.splice(index, 1);
        }
        Toastify({
          text: `Producto eliminado del carrito`,
          duration: 1000,
          style: {
            background: "rgba(0, 255, 128, 0.356)",
            color: "black",
          },
        }).showToast();
        guardarEnStorage(carrito);
        actualizarCarrito();
        contadorCarrito();
      });

      //Agregar al carrito el mismo producto//

      const addProductElement = document.createElement("button");
      addProductElement.className = "btn btn-outline-secondary btn-sm";
      addProductElement.textContent = "+";
      addProductElement.addEventListener("click", () => {
        agregarAlCarrito(product);
        actualizarCarrito(product);
        contadorCarrito();
      });

      //Vaciar Carrito//

      vaciarBtn.addEventListener("click", () => {
        carrito.length = 0;
        guardarEnStorage(carrito);
        actualizarCarrito();
        contadorCarrito();
      });

      div.appendChild(productDetailElement);
      div.appendChild(removeProductElement);
      div.appendChild(addProductElement);
      comprasHtml.appendChild(div);
    });

    //Precio Total//

    const totalPrecio = carrito.reduce(
      (acc, el) => acc + el.precio * el.cantidad,
      0
    );
    totalHtml.innerText = `El total de su compra es de $ ${totalPrecio}`;
    return totalPrecio;
  }
}

//FUNCIONES DE FILTRO DE PRODUCTOS://

//Segun su precio://

//1)Menor Precio//
function filtrarMenorPrecio() {
  tienda.sort((o1, o2) => {
    if (o1.precio < o2.precio) {
      return -1;
    } else if (o1.precio > o2.precio) {
      return 1;
    } else {
      return 0;
    }
  });
  mostrarProducts();
}
//2)Mayor Precio//
function filtrarMayorPrecio() {
  tienda.sort((o1, o2) => {
    if (o1.precio > o2.precio) {
      return -1;
    } else if (o1.precio < o2.precio) {
      return 1;
    } else {
      return 0;
    }
  });
  mostrarProducts();
}

//Seleccion de filtro de Precios//
function establecerFiltroPrecio() {
  let eleccion = document.querySelector(".filtroSelectorPrecio").value;
  console.log(eleccion);
  if (eleccion === "1") {
    filtrarMenorPrecio();
    establecerFiltroCategoria();
  } else {
    filtrarMayorPrecio();
    establecerFiltroCategoria();
  }
}
//Aplicacion de Filtro de Precios//
function filtrarPrecios() {
  const selectElement = document.querySelector(".filtroSelectorPrecio");
  const selectElemento = document.querySelector(".filtroSelectorCategoria");

  selectElement.addEventListener("change", establecerFiltroPrecio);
  selectElemento.addEventListener("change", establecerFiltroCategoria);
}

//Segun su categoria//

function establecerFiltroCategoria() {
  const proteina = tienda.filter((product) => product.categoria == "proteina");

  const vitamina = tienda.filter((product) => product.categoria == "vitamina");

  const otrosProductos = tienda.filter((product) => product.categoria == "otros");

  let eleccion = document.querySelector(".filtroSelectorCategoria").value;
  const sectionEcommerce = document.getElementById("productsHtml");

  sectionEcommerce.innerHTML = "";
  //Proteinas//
  if (eleccion === "Proteina") {
    let eleccionFinal = proteina;
    crearDom(eleccionFinal);
  //Vitaminas//
  } else if (eleccion === "Vitamina") {
    let eleccionFinal = vitamina;
    crearDom(eleccionFinal);
  //Otros Productos//
  } else if (eleccion === "OtrosProductos") {
    let eleccionFinal = otrosProductos;
    crearDom(eleccionFinal);
  //Sin Categoria//
  } else {
    mostrarProducts();
  }

  //Modificador del Dom segun el filtro//
  function crearDom(datorecuperado) {
    datorecuperado.forEach((product) => {
      const eCommerceHtml = document.createElement("article");
      eCommerceHtml.className = "cards";
      eCommerceHtml.innerHTML += `
                <img class="cards__img" src="${product.img}" alt="${
        product.nombre
      }">
                <h3 id= "ve" class="cards__titulo">${product.nombre}</h3>
                <p class="cards__info">${product.descripcion}.</p>
                <p class="cards__info"> Contenido neto: ${
                  product.contenidoNeto
                }.</p>
                <p class="cards__precioe${
                  product.precio < 3000 ? "-oferta" : "-comun"
                }">Precio: $ ${product.precio}</p>
                <button class="card_button" id="button${
                  product.id
                }">Agregar al carrito</button>
        `;
      sectionEcommerce.appendChild(eCommerceHtml);
      const card_button = document.getElementById(`button${product.id}`);
      contadorCarrito();
      card_button.addEventListener("click", () => {
        agregarAlCarrito(product);
        actualizarCarrito();
        contadorCarrito();
      });
    });
  }
}

//INTERACCION DE DATOS CON EL STORAGE://

//Guardando el array de "Carrito"://

function guardarEnStorage(lista) {
  localStorage.setItem(`tiendaStorage`, JSON.stringify(lista));
}

//Recuperando el array de "Carrito"://

function traerDelStorage() {
  let listaATraer = localStorage.getItem(`tiendaStorage`);
  if (listaATraer == null) {
    carrito = [];
  } else {
    carrito = JSON.parse(listaATraer);
  }
}

//Guardando el Historial de compras://

function guardarEnHistorial(lista) {
  traerDelHistorial();
  historialASubir = historialarray.concat(lista);
  localStorage.setItem(`Historial`, JSON.stringify(historialASubir));
}

//Recuperando el Historial de compras://

function traerDelHistorial() {
  let historialATraer = localStorage.getItem(`Historial`);
  if (historialATraer == null) {
    historialarray = [];
  } else {
    historialarray = JSON.parse(historialATraer);
  }
}

//MOSTRAR EL HISTORIAL://

function Historial() {
  const historial = document.getElementById("historial");
  const historialTitulo = document.getElementById("exampleModalLabel");
  historial.innerHTML = "";
  
  //Historial Modal//
  if (historialarray.length != 0) {
    historialTitulo.innerText = "Su historial de compras es el siguiente:";
    historialarray.forEach((product) => {
      historial.innerHTML += `<div class="contenedor" ><img class="carrito__img" src="${
        product.img
      }" alt="${product.nombre}"></img>
      <li class="">${product.cantidad} ${product.nombre} $${
        product.precio * product.cantidad
      }</li></div>
      `;
    });
  }
}

//FINALIZAR COMPRAS: //

function finalizarCompra() {
  const precioFinal = actualizarCarrito();

  //Alert de compra Exitosa//
  if (carrito.length >= 1) {
    Swal.fire({
      title: `Su compra por el total de ${precioFinal} fue realizada con exito`,
      icon: "success",
      showConfirmButton: false,
      timer: 2500,
    });

    guardarEnHistorial(carrito);
    carrito.length = 0;
    guardarEnStorage(carrito);
    actualizarCarrito();
    contadorCarrito();
    traerDelHistorial();
    Historial();

    //Alert cuando no hay productos en el carrito y se preciona el boton finalizar compra//
  } else {
    Swal.fire({
      title: "No fue posible realizar su compra",
      text: "Agregue un producto al carrito e intente nuevamente",
      icon: "error",
      showConfirmButton: false,
      timer: 2500,
    });
  }
}

//FUNCION PRINCIPAL QUE EJECUTA TODAS LAS DEMAS//

function eCommerce() {
  darkMode();
  filtrarPrecios();
  mostrarProducts();
  actualizarCarrito();

  const finalizar = document.getElementById("finalizar");
  finalizar.addEventListener("click", finalizarCompra);
}

//Ejecucion de la funcion principal "E-Commerce"//
eCommerce();