"use strict";

var _express = _interopRequireDefault(require("express"));
var _carrito = require("../controllers/carrito.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

//rutas
router.post('/agregar', _carrito.agregarProductoCarrito);
router.get('/visualizar/:idUsuario', _carrito.visualizarCarrito);
router.put('/editar/:idProducto', _carrito.actualizarCantidadCarrito);
router["delete"]('/eliminar/:idUsuario/:idProducto', _carrito.eliminarProductoCarrito);

//exportar todo
module.exports = router;