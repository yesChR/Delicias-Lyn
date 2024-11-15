import express from 'express';
import { crearSubcategoria, editarSubcategoria, eliminarSubcategoria, visualizarSubcategorias } from '../controllers/subcategoria.controller'
import { filtrarPorId } from '../controllers/categoria.controller';
const router = express.Router();

//rutas
router.post('/crear', crearSubcategoria);
router.get('/visualizar/', visualizarSubcategorias);
router.get('/filtrar/:idSubcategoria', filtrarPorId);
router.delete('/eliminar/:idSubcategoria', eliminarSubcategoria);
router.put('/editar/:idSubcategoria/:idCategoria', editarSubcategoria);


//exportar todo
module.exports = router;