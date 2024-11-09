import express from 'express';
import { generarInformeVentas } from '../controllers/informe.controller';

const router = express.Router();
router.get('/informe', generarInformeVentas); // "periodo" puede ser "diario", "mensual", o "anual"

module.exports = router;