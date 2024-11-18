import express from 'express';
import { visualizarEstado } from '../controllers/estado.controller';
const router = express.Router();

//rutas
router.get('/visualizar', visualizarEstado);

//exportar todo
module.exports = router;