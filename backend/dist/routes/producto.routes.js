"use strict";

var _express = _interopRequireDefault(require("express"));
var _producto = require("../controllers/producto.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// Rutas para manejar productos
router.post('/crear', _producto.crearProducto); // Crear producto
router.get('/visualizar', _producto.visualizarProductos); // Ver todos los productos
router.get('/filtrar/:id', _producto.filtrarProductoPorId); // Filtrar producto por id
router["delete"]('/eliminar/:id', _producto.eliminarProductoPorId); // Eliminar producto por id
router.put('/editar/:id', _producto.editarProductoPorId); // Editar producto por id
router.get('/filtrar/nombre/:nombre', _producto.filtrarProductoPorNombre);
router.get("/filtrar/subcategoria/:idSubcategoria", _producto.filtrarProductoPorSubcategoria);

// Exportar las rutas
module.exports = router;