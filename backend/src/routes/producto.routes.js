import express from 'express';
import { crearProducto, editarProducto, eliminarProducto, filtrarProductoPorNombre, visualizarProductos } from '../controllers/producto.controller';
const router = express.Router();

// Rutas para manejar productos
router.post('/crear', crearProducto);  // Crear producto
router.get('/visualizar', visualizarProductos);  // Ver todos los productos
router.get('/filtrar/:nombre', filtrarProductoPorNombre);  // Filtrar producto por nombre
router.delete('/eliminar/:nombre', eliminarProducto);  // Eliminar producto por nombre
router.put('/editar/:nombre', editarProducto);  // Editar producto por nombre

// Exportar las rutas
module.exports = router;
