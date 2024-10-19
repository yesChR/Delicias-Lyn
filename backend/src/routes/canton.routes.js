import express from 'express';
import { visualizarCanton } from '../controllers/canton.controller';
const router = express.Router();

//rutas
router.get('/visualizar', visualizarCanton);

//exportar todo
module.exports = router;
