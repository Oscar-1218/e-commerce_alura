import { productoServices } from "../service/productos-servicios.js";
////AQUI SE TOMA LOS DATOS INGRESADOS A TRAVEZ DEL addProductos


const form = document.querySelector('[data-form]');

form.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    const categoria = document.querySelector('[data-category]').value;
    const url = document.querySelector('[data-urlImg]').value;
    const nombre = document.querySelector('[data-name]').value;
    const price = document.querySelector('[data-price]').value;
    const description = document.querySelector('[data-description]').value;
    

    productoServices.createProducto(nombre,url,price,description,categoria).then(respuesta => {    
        /* llamo al servicio 'porductoServices' y llamo al metodo 'crearProducto'*/
        /*window.location.href= "/index.html"*///despues de que se cree la respuesta, nos redirecciona a cierta pagina.
        /*Podria poner la opcion de ¿Desea agregar mas productos o volver a inicio ?*/    
        alert('El producto fue creado con exito!')
        console.log(respuesta);
        }).catch(err =>{
            console.log(err)
        })
}); 

