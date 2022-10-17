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


//ACTUALIZO LA IMAGEN DEL PRODUCTO.
let fnNewUrl = document.querySelector("[data-urlImg]") 
fnNewUrl.addEventListener("input", actualizar); 
function actualizar(){
  const printImg = document.querySelector("[data-printImg]") //ruta que deseo actualizar para ver la nueva imagen  
  const urlImgActualizada = document.querySelector("[data-urlImg]").value
  const contenido = `
  <div>
  <img src="${urlImgActualizada}" alt="" class="producto__img" data-urlImg>
  </div>`;

  printImg.innerHTML = contenido;
}


///aqui se ejecuta al dar click luego de editar
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const url = new URL(window.location);
  const id = url.searchParams.get("id");
  console.log(id)
  const name = document.querySelector("[data-name]").value
  const price = document.querySelector("[data-price]").value
  const imageUrl = document.querySelector("[data-urlImg]").value
  const description = document.querySelector("[data-description]").value
  const category = document.querySelector("[data-category]").value
  productoServices.updateProducto(name, imageUrl, price, description,category, id).then(() => { //ACTUALIZARcLIENTE
    console.log("Se edito correctamente")
  //window.location.href = "/screens/edicion_concluida.html";
  });
});
//comentario