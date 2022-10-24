import {productoServices} from "../service/productos-servicios.js"

//READ Y MUETRA POR PANTALLA

let arrayCategorias = [];

const nuevoProducto =(name, price, imageUrl,lugar,id) =>{ //si quito "lugar" tengo problemas
    const card = document.createElement("div");
    const contenido = `
    <div>
      <img src="${imageUrl}" alt="" class="producto__img" data-urlImg>
      <p class="nombreProducto" data-name>${name} </p>
      <p class="precio" data-price>$${price} </p>
      <p class="verProducto"><a href="http://127.0.0.1:5501/seeProduct.html?id=${id}" data-verProducto>Ver producto</a></p> 
      <div class="productos_btnUD">
        <a href="http://127.0.0.1:5501/editar.html?id=${id}" data-id>
          <i class="ediciones fa-solid fa-pencil fa-lg" data-editar></i>
        </a>
          <i class="ediciones fa-solid fa-trash-can fa-lg" id=${id} data-eliminar></i>
      </div>`;
    card.innerHTML = contenido;
    card.classList.add("card"); //crea el margin y padding, marco,border etc
    
////// ↓↓ Eliminar producto
    const btnDelete = card.querySelector("[data-eliminar]"); 
    btnDelete.addEventListener("click", () => {
      productoServices.deleteProducto(id).then((respuesta) => {
      console.log(respuesta);
      }).catch((err) => alert("Ocurrió un error"));
    })
    return card;
}

const nuevaCategoria =(categoria) =>{         
  const crearDiv = document.createElement('div') //<- nodo creado. // 1° ESTO ESTA BIEN!!
  const contenidoCateg = `
  <h2 data-categoria_hdos>${categoria}</h2>
  <a href="">Ver todo<i class="fa-solid fa-arrow-right-long"></i></a> `;
  crearDiv.innerHTML = contenidoCateg; //2° al elemento creado le asigno el contenido
  crearDiv.classList.add("producto__titulo") //Le asigno la class="producto__titulo" al div creado
          
  return crearDiv;
}

const categorias = document.querySelector("[data-nombreCategoria]")  
const productos = document.querySelector("[data-productos]")
// dataAtribute para crear el codigo en el html y mostrarlo por pantalla.
const render = async () => { //hace que una fn devuelva una promesa y Await hace que una fn espere una promesa.
  try{
    const listaProductos = await productoServices.listaProductos();
    let arrayCategorias = [];

    listaProductos.forEach(elemento => {
      let categoria = elemento.category
      let validar = arrayCategorias.toString();

      /* si No existe la categoria, imprimirla + el producto */
      if(!validar.includes(categoria)){ 
        arrayCategorias.unshift(categoria)
        //console.log("arrayCategorias->",arrayCategorias)
        console.log("IMPRIMIR",categoria) 
        categorias.appendChild(nuevaCategoria(elemento.category)) // llamo a la fn pasandole los parametros
        productos.appendChild(nuevoProducto(elemento.name, elemento.price, elemento.imageUrl,
          elemento.category, elemento.id))  
      } 
        else{
          let categHdos = document.querySelector("[data-categoria_hdos]").textContent;
          console.log("REPETIDA categHdos",categHdos)
          
          productos.appendChild(nuevoProducto(elemento.name, elemento.price, elemento.imageUrl,
            elemento.category, elemento.id))
          }
      });
        
        }catch(error){
            console.log(error)
        }
    }

render();

