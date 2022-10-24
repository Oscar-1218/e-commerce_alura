import { productoServices } from "../service/productos-servicios.js";

    const seeProducto = async () => {
        const url = new URL(window.location); //muetra distintas porpiedades del url print(url)
        const id = url.searchParams.get("id"); //obtenemos el parametro a travez del "id"
        if (id === null) {        
          window.location.href = "http://127.0.0.1:5501/error.html"; //me redirige
        }
        
        try {
          const producto = await productoServices.readProducto(id); //DETALLEcLIENTE
          //↓↓↓ imprime por pantalla↓
            if (producto) {
                const contenido = ` <div class="productSelect__container__caracterist">
                    <h2 class="productSelect__nombre">${producto.name}</h2>
                    <div class="imgYdescrip">
                        <img src="${producto.imageUrl}" class="productSelect__img">
                        <p class="productSelect__description" data-description>${producto.description}</p>
                    </div>
                    <h4 class="productSelect__precio">$${producto.price}</h4>
                    </div>`;
                    productoSelect.innerHTML = contenido;                         
            }

        }catch(error) { 
            console.log("Ups! Ocurrio un error")
            window.location.href = "http://127.0.0.1:5501/error.html";    
        }
    };

const productoSelect = document.querySelector("[data-productSelect-container]")
seeProducto();

let arrayCategorias = [];
const nuevoProducto =( name, price, imageUrl,category,id) =>{         
    
    let validar = arrayCategorias.toString();   //
/*
                if(!validar.includes(category)){    
                  console.log("id del name ",name,id)
                  arrayCategorias.unshift(category)//
                    
            
                  const card = document.createElement("div");
                  const contenido = ` 
                   <div class="producto__titulo" data-tituloCategoria> 
                        <h2>${category}</h2>
                    <a href="">Ver todo<i class="fa-solid fa-arrow-right-long"></i></a> 
                  </div>
                    `;
                  card.innerHTML = contenido;
                  card.classList.add("card"); //crea el margin y padding correspondiente.
                  console.log("Creo category + producto")
                  return card; 
                }
  */  
    const card = document.createElement("div");
       
    const contenido = `
    <div>
      <img src="${imageUrl}" alt="" class="producto__img" data-urlImg>
      <p class="nombreProducto" data-name>${name} </p>
      <p class="precio" data-price>$${price} </p>
      <p class="verProducto"><a href="http://127.0.0.1:5501/seeProduct.html?id=${id}" data-verProducto>Ver producto</a></p> 
      </div>`;
    card.innerHTML = contenido;
    card.classList.add("card"); //crea el margin y padding, marco,border etc
    
    return card;
    }

const productos = document.querySelector("[data-productos]")
// dataAtribute para crear el codigo en el html y mostrarlo por pantalla.
const render = async () => { //hace que una fn devuelva una promesa y Await hace que una fn espere una promesa.
  try{
    const listaProductos = await productoServices.listaProductos();
    listaProductos.forEach(elemento => {
        const url = new URL(window.location); //muetra distintas porpiedades del url print(url)
        const idDeUrl = url.searchParams.get("id"); //obtenemos el parametro a travez del "id"

        if(elemento.id != idDeUrl){
          console.log("Imprimir ",elemento.name)
          productos.appendChild(nuevoProducto(elemento.name, elemento.price, elemento.imageUrl,
            elemento.category, elemento.id))
          } 
        });
      
        }catch(error){
            console.log(error)
        }
    }

render();

