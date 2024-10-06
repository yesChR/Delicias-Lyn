import express from 'express';
import { crearCategoria, editarCategoria, eliminarCategoria, filtrarPorId, visualizarCategorias } from '../controllers/categoria.controller'
const router = express.Router();

//rutas
router.post('/crear', crearCategoria);
router.get('/visualizar', visualizarCategorias);
router.get('/filtrar/:id', filtrarPorId);
router.delete('/eliminar/:id', eliminarCategoria);
router.put('/editar/:id', editarCategoria);

//exportar todo
module.exports = router;