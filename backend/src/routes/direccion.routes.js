import express from 'express';
import { visualizarDireccion } from '../controllers/direccion.controller';
const router = express.Router();

//rutas
router.get('/visualizar', visualizarDireccion);

//exportar todo
module.exports = router;
