import express from 'express';
//import { enviarId } from '../controllers/carrito.controller'

// -> Si descomentan el import da errorshh al no existir producto xD
// import { 
//     agregarProductoCarrito, 
//     visualizarCarrito, 
//     actualizarCantidadCarrito, 
//     eliminarProductoCarrito 
// } from '../controllers/carrito.controller';

const router = express.Router();

//rutas
// router.post('/carrito', agregarProductoCarrito);
// router.get('/carrito/:idUsuario', visualizarCarrito);
// router.put('/carrito', actualizarCantidadCarrito);
// router.delete('/carrito/:idUsuario/:idProducto', eliminarProductoCarrito);

//exportar todo
module.exports = router;