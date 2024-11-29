"use strict";

var _express = _interopRequireDefault(require("express"));
var _distrito = require("../controllers/distrito.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

//rutas
router.get('/visualizar', _distrito.visualizarDistrito);

//exportar todo
module.exports = router;