import express from 'express';
import { enviarId } from '../controllers/usuario.controller'

const router = express.Router();


//rutas
router.post('/:id', enviarId);


//exportar todo
module.exports = router;