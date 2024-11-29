"use strict";

var _express = _interopRequireDefault(require("express"));
var _usuario = require("../controllers/usuario.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

//rutas
router.post('/:id', _usuario.enviarId);

//exportar todo
module.exports = router;