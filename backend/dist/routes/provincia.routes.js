"use strict";

var _express = _interopRequireDefault(require("express"));
var _provincia = require("../controllers/provincia.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

//rutas
router.get('/visualizar', _provincia.visualizarProvincia);
router.get('/visualizar/limon', _provincia.visualizarProvLimon);

//exportar todo
module.exports = router;