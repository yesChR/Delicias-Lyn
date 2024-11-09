import express from 'express';
import { generarInformeVentas } from '../controllers/informe.controller';

const router = express.Router();
router.get('/ventas/:periodo', generarInformeVentas); // "periodo" puede ser "diario", "mensual", o "anual"

export default router;
