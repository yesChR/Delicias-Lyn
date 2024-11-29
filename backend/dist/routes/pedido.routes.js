"use strict";

var _express = _interopRequireDefault(require("express"));
var _pedido = require("../controllers/pedido.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

//rutas
router.post('/crear', _pedido.crearPedido);
router.get('/visualizar', _pedido.visualizarPedidos);
router.put('/editarEstado/:idPedido', _pedido.editarEstado);
router.put('/editarPrioridad/:idPedido', _pedido.editarPrioridad);
router.get('/filtrarPorEstado', _pedido.filtrarPorEstado);
router.get('/filtrarPorEstado/:idEstado', _pedido.filtrarPorEstado);
router.get('/filtrarPorId/:idPedido', _pedido.filtrarPorId);
router.get('/filtrarPorUsuario/:idUsuario', _pedido.filtrarPorUsuario);

//exportar todo
module.exports = router;