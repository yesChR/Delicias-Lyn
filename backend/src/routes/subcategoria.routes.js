import express from 'express';
import { crearSubcategoria, visualizarSubcategorias } from '../controllers/subcategoria.controller'
const router = express.Router();

//rutas
router.post('/crear/:id', crearSubcategoria);
router.get('/visualizar/', visualizarSubcategorias);


//exportar todo
module.exports = router;