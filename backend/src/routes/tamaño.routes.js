import express from 'express';
import {
    crearTamaño,
    obtenerTamaños,
    obtenerTamañoPorId,
    actualizarTamaño,
    eliminarTamaño
} from '../controllers/tamaño.controller';

const router = express.Router();

// Crear tamaño
router.post('/crear', crearTamaño);

// Obtener todos los tamaños
router.get('/visualizar', obtenerTamaños);

// Obtener tamaño por ID
router.get('/filtrar/:id', obtenerTamañoPorId);

// Actualizar tamaño
router.put('/editar/:id', actualizarTamaño);

// Eliminar tamaño
router.delete('/eliminar/:id', eliminarTamaño);

module.exports = router;
