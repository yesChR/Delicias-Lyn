import express from 'express';
//import { enviarId } from '../controllers/carrito.controller'

import { 
    agregarProductoCarrito, 
    visualizarCarrito, 
    actualizarCantidadCarrito, 
    eliminarProductoCarrito 
} from '../controllers/carrito.controller';

const router = express.Router();

//rutas
router.post('/agregar', agregarProductoCarrito);
router.get('/visualizar/:idUsuario', visualizarCarrito);
router.put('/editar/:idProducto', actualizarCantidadCarrito);
router.delete('/eliminar/:idProducto', eliminarProductoCarrito);

//exportar todo
module.exports = router;