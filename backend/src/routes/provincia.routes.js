import express from 'express';
import { visualizarProvincia } from '../controllers/provincia.controller';
const router = express.Router();

//rutas
router.get('/visualizar', visualizarProvincia);

//exportar todo
module.exports = router;
