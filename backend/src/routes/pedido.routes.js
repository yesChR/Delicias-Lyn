import express from 'express';
import { crearPedido, visualizarPedidos, editarEstado, editarPrioridad } from '../controllers/pedido.controller'
const router = express.Router();

//rutas
router.post('/crear', crearPedido);
router.get('/visualizar', visualizarPedidos);
router.put('/editarEstado/:idPedido', editarEstado);
router.put('/editarPrioridad/:idPedido', editarPrioridad);

//exportar todo
module.exports = router;