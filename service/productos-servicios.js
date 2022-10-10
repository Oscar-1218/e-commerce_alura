/* -servicios- se comunica con la BBDD para hacer CRUD */
const listaProductos = () => fetch("http://localhost:3000/producto").then(respuesta => respuesta.json());

//a la constante 'createProducto' le paso los datos que quiero ALMACENAR en el archivo db.JSON
const createProducto = async (name, imageUrl, price, description,category ) => {
    const respuesta = await fetch('http://localhost:3000/producto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' /*aqui le defino cual va a ser el method y el tipo de aplicacion*/
        },
        body: JSON.stringify({name, imageUrl, price, description,category, id: uuid.v4() })
    });
    if (respuesta.ok) {
        return respuesta.body;
    }
    throw new Error('No fue posible crear el producto'); //throw = lanzar
};

//READ
const readProducto = async (id) =>{
    const respuesta = await fetch(`http://localhost:3000/producto/${id}`);
  return await respuesta.json();}
    
//UPDATE
  const updateProducto = (name, imageUrl, price, description,category,id) =>{
    return fetch(`http://localhost:3000/producto/${id}`,{
    method: 'PUT',
    headers: {
    'Content-Type':'application/json'},
    body: JSON.stringify({name, imageUrl, price, description,category})
  }).then((respuesta) => respuesta)
  .catch(err => console.log('Error al intentar modificar'))
  }
//DELETE
  const deleteProducto = (id)=>{
    console.log('Eliminar a: '+ id)
    return fetch(`http://localhost:3000/producto/${id}`,{
      method: "DELETE"
    })
  };


function saludar(){
  console.log("hola desde productosServices" )
}


/*con esto logro exportar los servicios y utilizarlos en otros archivos(que seran los controllers) */
export const productoServices = {
    listaProductos, 
    createProducto,
    readProducto,
    updateProducto,
    deleteProducto,saludar
}
