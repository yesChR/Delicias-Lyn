"use strict";

var _express = _interopRequireDefault(require("express"));
var _direccion = require("../controllers/direccion.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

//rutas
router.get('/visualizar', _direccion.visualizarDireccion);

//exportar todo
module.exports = router;