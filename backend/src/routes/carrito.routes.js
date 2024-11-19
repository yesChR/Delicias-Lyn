import express from 'express';

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
router.delete('/eliminar/:idUsuario/:idProducto', eliminarProductoCarrito);

//exportar todo
module.exports = router;