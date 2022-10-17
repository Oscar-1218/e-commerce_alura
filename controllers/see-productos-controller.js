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
                console.log("estoy dentro")
                
                const contenido = ` <div class="productSelect__container__caracterist">
                    <h2 class="productSelect__nombre">${producto.name}</h2>
                    <div class="imgYdescrip">
                        <img src="${producto.imageUrl}" class="productSelect__img">
                        <p class="productSelect__description" data-description>${producto.description}</p>
                    </div>
                    <h4 class="productSelect__precio">$${producto.price}</h4>
                    </div>`;
                    console.log(contenido)
                    productoSelect.innerHTML = contenido;      
            }

        }catch(error) { 
            console.log("Ups! Ocurrio un error")
            window.location.href = "http://127.0.0.1:5501/error.html";    
        }
    };

const productoSelect = document.querySelector("[data-productSelect-container]")
seeProducto();