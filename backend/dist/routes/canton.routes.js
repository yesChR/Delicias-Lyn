"use strict";

var _express = _interopRequireDefault(require("express"));
var _canton = require("../controllers/canton.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

//rutas
router.get('/visualizar', _canton.visualizarCanton);

//exportar todo
module.exports = router;