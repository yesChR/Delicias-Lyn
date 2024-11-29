"use strict";

var _express = _interopRequireDefault(require("express"));
var _tamañoXproducto = require("../controllers/tama\xF1oXproducto.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// Ruta para crear una nueva relación TamañoXProducto
router.post("/crear", _tamañoXproducto.crearTamañoXProducto);

// Ruta para obtener todas las relaciones TamañoXProducto
router.get("/visualizar", _tamañoXproducto.obtenerTamañosXProductos);

// Ruta para filtrar TamañoXProducto por idSubcategoria
router.get("/filtrar/subcategoria/:idSubcategoria", _tamañoXproducto.filtrarTamañoXProductoPorSubcategoria); // Nueva ruta para filtrar por subcategoría

// Ruta para obtener una relación TamañoXProducto específica por idProducto y idTamaño
//router.get("/visualizar/:idProducto/:idTamano", obtenerTamañoXProductoPorId);

// Ruta para actualizar una relación TamañoXProducto (aunque no tiene datos editables)
//router.put("/actualizar/:idProducto/:idTamano", actualizarTamañoXProducto);

// Ruta para eliminar una relación TamañoXProducto
//router.delete("/eliminar/:idProducto/:idTamano", eliminarTamañoXProducto);

module.exports = router;