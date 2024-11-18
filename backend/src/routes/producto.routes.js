import express from 'express';
import { crearProducto, editarProducto, editarProductoPorId, eliminarProducto, eliminarProductoPorId, filtrarProductoPorId, filtrarProductoPorNombre, visualizarProductos } from '../controllers/producto.controller';
const router = express.Router();

// Rutas para manejar productos
router.post('/crear', crearProducto);  // Crear producto
router.get('/visualizar', visualizarProductos);  // Ver todos los productos
router.get('/filtrar/:id', filtrarProductoPorId);  // Filtrar producto por id
router.delete('/eliminar/:id', eliminarProductoPorId);  // Eliminar producto por id
router.put('/editar/:id', editarProductoPorId);  // Editar producto por id

// Exportar las rutas
module.exports = router;
