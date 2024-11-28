import express from 'express';
import { visualizarPedidoPDF } from '../controllers/informe.controller';

const router = express.Router();
router.get('/generar/:rango', visualizarPedidoPDF); // "periodo" puede ser "diario", "mensual", o "anual"

module.exports = router;