import express from 'express';
import { validarToken , limitarIntentos} from '../middlewares/auth.middleware';

import {
    registrar, iniciarSesion, cerrarSesion, cambiarContraseña,
    solicitarRecuperacion, resetearContraseña
} from '../controllers/auth.controller'
const router = express.Router();

router.post('/registrar/', registrar);
router.post('/iniciar-sesion', iniciarSesion);
router.post('/cerrar-sesion/', cerrarSesion);
router.put('/cambiar-clave', validarToken, cambiarContraseña);
router.post('/solicitar-recuperacion', solicitarRecuperacion); // Solicita el restablecimiento de la contraseña
router.post('/resetear', limitarIntentos, resetearContraseña);


//exportar todo
module.exports = router;