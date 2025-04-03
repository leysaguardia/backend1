// java permite la mutabilidad de las variables (perjudica a la larga en proyectos grandes)
//let nombre = "santiago"

//nombre = 12

//console.log(nombre);

//nombre= diego
//console.log(nombre);


//tipos de datos 

//console.log(typeof nombre);

//const obj = { clave: "valor"}
 //const obj = {nombre: "andres", apellidos: "sanchez"}
//console.log(obj);
//console.log(typeof obj);

//const array = [1, 2, 3, 4, 5, "hola", {nombre:"andres", apellidos:"sanchez"}, true]
//console.log(array);
//console.log(typeof array);
  //No es mutable y genera error 
//const nombre_02 = "pablo";
//nombre_02 = "juan";    // las constantes una vez asigandas con un valor definido, no se pueden modificar


const express = require('express');
const app = express();
const productsRoutes = require('./routes/products.routes');
const cartsRoutes = require('./routes/carts.routes');

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));













