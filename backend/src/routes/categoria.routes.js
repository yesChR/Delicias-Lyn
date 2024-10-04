import express from 'express';
import { crearCategoria } from '../controllers/categoria.controller'
const router = express.Router();

//rutas
router.post('/:idCategoria', crearCategoria);


//exportar todo
module.exports = router;