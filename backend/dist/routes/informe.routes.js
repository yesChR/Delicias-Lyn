"use strict";

var _express = _interopRequireDefault(require("express"));
var _informe = require("../controllers/informe.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get('/generar/:rango', _informe.visualizarPedidoPDF); // "periodo" puede ser "diario", "mensual", o "anual"

module.exports = router;