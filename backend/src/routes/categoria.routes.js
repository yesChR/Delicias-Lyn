import express from 'express';
import { crearCategoria, editarCategoria, eliminarCategoria, filtrarPorId, visualizarCategorias } from '../controllers/categoria.controller'
const router = express.Router();

//rutas
router.post('/crear', crearCategoria);
router.get('/visualizar', visualizarCategorias);
router.get('/filtrar/:idCategoria', filtrarPorId);
router.delete('/eliminar/:idCategoria', eliminarCategoria);
router.put('/editar/:idCategoria', editarCategoria);

//exportar todo
module.exports = router;