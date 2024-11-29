"use strict";

var _express = _interopRequireDefault(require("express"));
var _categoria = require("../controllers/categoria.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

//rutas
router.post('/crear', _categoria.crearCategoria);
router.get('/visualizar', _categoria.visualizarCategorias);
router.get('/filtrar/:idCategoria', _categoria.filtrarPorId);
router["delete"]('/eliminar/:idCategoria', _categoria.eliminarCategoria);
router.put('/editar/:idCategoria', _categoria.editarCategoria);

//exportar todo
module.exports = router;