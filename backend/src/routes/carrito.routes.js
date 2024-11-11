import express from 'express';
//import { enviarId } from '../controllers/carrito.controller'
import { agregarProductoCarrito, visualizarCarrito, eliminarProductoCarrito } from '../controllers/carrito.controller';
const router = express.Router();

//rutas
//router.post('/:id', enviarId);
router.post('/agregar', agregarProductoCarrito);
router.get('/visualizar/:idUsuario', visualizarCarrito);
router.delete('/eliminar/:idUsuario/:idProducto', eliminarProductoCarrito);



//exportar todo
module.exports = router;