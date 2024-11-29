"use strict";

var _express = _interopRequireDefault(require("express"));
var _tamaño = require("../controllers/tama\xF1o.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// Crear tamaño
router.post('/crear', _tamaño.crearTamaño);

// Obtener todos los tamaños
router.get('/visualizar', _tamaño.obtenerTamaños);

// Obtener tamaño por ID
router.get('/filtrar/:id', _tamaño.obtenerTamañoPorId);

// Actualizar tamaño
router.put('/editar/:id', _tamaño.actualizarTamaño);

// Eliminar tamaño
router["delete"]('/eliminar/:id', _tamaño.eliminarTamaño);
module.exports = router;