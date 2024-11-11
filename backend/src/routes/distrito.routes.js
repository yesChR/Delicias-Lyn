import express from 'express';
import { visualizarDistrito } from '../controllers/distrito.controller';
const router = express.Router();

//rutas
router.get('/visualizar', visualizarDistrito);

//exportar todo
module.exports = router;