import {productoServices} from "../service/productos-servicios.js"

//READ Y MUETRA POR PANTALLA

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
    //console.log("readProducto(id)->",productoServices.readProducto(id))
    
    //console.log(imageUrl)
    if(id == 8888888888888888){
      console.log("id->",id)
    };
    const contenido = `
    <div>
      <img src="${imageUrl}" alt="" class="producto__img" data-urlImg>
      <p class="nombreProducto" data-name>${name} </p>
      <p class="precio" data-price>$${price} </p>
      <p class="verProducto"><a href="http://127.0.0.1:5501/seeProduct.html?id=${id}">Ver producto</a></p> 
      <div class="productos_btnUD">
        <a href="http://127.0.0.1:5501/editar.html?id=${id}" data-id>
          <i class="ediciones fa-solid fa-pencil fa-lg" data-editar></i>
        </a>
          <i class="ediciones fa-solid fa-trash-can fa-lg" id=${id} data-eliminar></i>
      </div>`;
    card.innerHTML = contenido;
    card.classList.add("card"); //crea el margin y padding, marco,border etc
    
    

////// Eliminar producto
    const btnDelete = card.querySelector("[data-eliminar]"); 
    btnDelete.addEventListener("click", () => {
      productoServices.deleteProducto(id).then((respuesta) => {
      console.log(respuesta);
      }).catch((err) => alert("Ocurrió un error"));
    })
/////
    return card;
    }
    
    

    const productos = document.querySelector("[data-productos]")
    // dataAtribute para crear el codigo en el html y mostrarlo por pantalla.
    const render = async () => { //hace que una fn devuelva una promesa y Await hace que una fn espere una promesa.
        try{
            const listaProductos = await productoServices.listaProductos();
            listaProductos.forEach(elemento => {
            
                
                productos.appendChild(nuevoProducto(elemento.name, elemento.price, elemento.imageUrl, elemento.category, elemento.id))
            });
        }catch(error){
            console.log(error)
        }
    }
    render();
    