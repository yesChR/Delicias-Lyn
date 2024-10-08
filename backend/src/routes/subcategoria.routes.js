import express from 'express';
import { crearSubcategoria, visualizarSubcategorias } from '../controllers/subcategoria.controller'
import { filtrarPorId } from '../controllers/categoria.controller';
const router = express.Router();

//rutas
router.post('/crear/:idCategoria', crearSubcategoria);
router.get('/visualizar/', visualizarSubcategorias);
router.get('/filtrar/:idSubcategoria', filtrarPorId);

//exportar todo
module.exports = router;