"use strict";

var _express = _interopRequireDefault(require("express"));
var _auth = require("../middlewares/auth.middleware");
var _auth2 = require("../controllers/auth.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post('/registrar/', _auth2.registrar);
router.post('/iniciar-sesion', _auth2.iniciarSesion);
router.post('/cerrar-sesion/', _auth2.cerrarSesion);
router.put('/cambiar-clave', _auth.validarToken, _auth2.cambiarContraseña);
router.post('/solicitar-recuperacion', _auth2.solicitarRecuperacion); // Solicita el restablecimiento de la contraseña
router.post('/resetear', _auth.limitarIntentos, _auth2.resetearContraseña);
router.post('/validar/:tipo', _auth2.validarCredencial);

//exportar todo
module.exports = router;