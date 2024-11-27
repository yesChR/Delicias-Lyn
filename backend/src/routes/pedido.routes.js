import express from 'express';
import { crearPedido, visualizarPedidos, editarEstado, editarPrioridad, filtrarPorEstado, filtrarPorUsuario } from '../controllers/pedido.controller'
const router = express.Router();

//rutas
router.post('/crear', crearPedido);
router.get('/visualizar', visualizarPedidos);
router.put('/editarEstado/:idPedido', editarEstado);
router.put('/editarPrioridad/:idPedido', editarPrioridad);
router.get('/filtrarPorEstado', filtrarPorEstado);
router.get('/filtrarPorEstado/:idEstado', filtrarPorEstado);
router.get('/filtrarPorUsuario/:idUsuario', filtrarPorUsuario);

//exportar todo
module.exports = router;