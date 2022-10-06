import { productoServices } from "../service/productos-servicios.js";
console.log("hola desde update-productos.controllers.js")
const formulario = document.querySelector("[data-form]");

//obteniendo informacion necesaria
const obtenerInformacion = async () => {
  const url = new URL(window.location); //muetra distintas porpiedades del url print(url)
  const id = url.searchParams.get("id"); //obtenemos el parametro a travez del "id"
  
  if (id === null) {        
    window.location.href = "http://127.0.0.1:5501/error.html"; //me redirige
  }
  const category = document.querySelector("[data-category]")
  const urlImg = document.querySelector("[data-urlImg]")
  const printImg = document.querySelector("[data-printImg]")
  const price = document.querySelector("[data-price]")
  const name = document.querySelector("[data-name]")
  const description = document.querySelector("[data-description]")
  try {
    const producto = await productoServices.readProducto(id); //DETALLEcLIENTE
    //console.log("->",producto.imageUrl)
    //↓↓↓ imprime por pantalla↓
    if (producto) {
        category.value = producto.category;
        urlImg.value = producto.imageUrl;

        const contenido = `
          <div>
            <img src="${producto.imageUrl}" alt="" class="producto__img" data-urlImg>
          </div>`;
        printImg.innerHTML = contenido;

      

        price.value = producto.price;
        name.value = producto.name;
        description.value = producto.description;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log("Ups! Ocurrio un error")
  }
};
obtenerInformacion();


/*
let fnNewUrl = document.querySelector("[data-urlImg]") //donde muestra la ruta
fnNewUrl.addEventListener("input", actualizar); //llamo a la funcion actualizar

function actualizar(){
  let newUrlImg = document.querySelector("[data-printImg]") //ruta que deseo actualizar para ver la nueva imagen
  console.log(newUrlImg)
  const url = new URL(window.location); //muetra distintas porpiedades del url print(url)
  const id = url.searchParams.get("id"); 
  //const producto = productoServices.readProducto(id);

  const printImg = document.querySelector("[data-printImg]")
  const contenido = `
  <div>
  <img src="${newUrlImg}" alt="" class="producto__img" data-urlImg>
  </div>`;
  console.log("contenido",contenido)
  printImg.innerHTML = contenido;
}
*/
///aqui se ejecuta al dar click luego de editar
formulario.addEventListener("submit", (evento) => {
  console.log("Se edito correctamente")
  evento.preventDefault();
  const url = new URL(window.location);
  const category = document.querySelector("[data-category]").value
  const imgUrl = document.querySelector("[data-urlImg]").value
  const price = document.querySelector("[data-price]").value
  const name = document.querySelector("[data-name]").value
  const description = document.querySelector("[data-description]").value
//   clientServices.actualizarCliente(nombre, email, id).then(() => { //ACTUALIZARcLIENTE
//     window.location.href = "/screens/edicion_concluida.html";
//   });
});
//comentario