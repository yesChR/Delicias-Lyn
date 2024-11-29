"use strict";

var _express = _interopRequireDefault(require("express"));
var _subcategoria = require("../controllers/subcategoria.controller");
var _categoria = require("../controllers/categoria.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

//rutas
router.post('/crear', _subcategoria.crearSubcategoria);
router.get('/visualizar/', _subcategoria.visualizarSubcategorias);
router.get('/filtrar/:idSubcategoria', _categoria.filtrarPorId);
router["delete"]('/eliminar/:idSubcategoria', _subcategoria.eliminarSubcategoria);
router.put('/editar/:idSubcategoria/:idCategoria', _subcategoria.editarSubcategoria);

//exportar todo
module.exports = router;