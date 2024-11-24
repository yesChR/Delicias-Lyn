import express from 'express';
import { visualizarProvincia, visualizarProvLimon } from '../controllers/provincia.controller';
const router = express.Router();

//rutas
router.get('/visualizar', visualizarProvincia);
router.get('/visualizar/limon', visualizarProvLimon);

//exportar todo
module.exports = router;
