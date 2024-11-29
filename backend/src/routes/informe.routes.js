import express from 'express';
import { visualizarInforme } from '../controllers/informe.controller';

const router = express.Router();
router.post('/generar', visualizarInforme); 

module.exports = router;