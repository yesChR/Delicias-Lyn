import express from "express";
import {
    crearTamañoXProducto,
    obtenerTamañosXProductos,
    obtenerTamañoXProductoPorId,
    actualizarTamañoXProducto,
    eliminarTamañoXProducto,
    filtrarTamañoXProductoPorSubcategoria, 
} from "../controllers/tamañoXproducto.controller";

const router = express.Router();

// Ruta para crear una nueva relación TamañoXProducto
router.post("/crear", crearTamañoXProducto);

// Ruta para obtener todas las relaciones TamañoXProducto
router.get("/visualizar", obtenerTamañosXProductos);

// Ruta para filtrar TamañoXProducto por idSubcategoria
router.get("/filtrar/subcategoria/:idSubcategoria", filtrarTamañoXProductoPorSubcategoria);  // Nueva ruta para filtrar por subcategoría

// Ruta para obtener una relación TamañoXProducto específica por idProducto y idTamaño
//router.get("/visualizar/:idProducto/:idTamano", obtenerTamañoXProductoPorId);

// Ruta para actualizar una relación TamañoXProducto (aunque no tiene datos editables)
//router.put("/actualizar/:idProducto/:idTamano", actualizarTamañoXProducto);

// Ruta para eliminar una relación TamañoXProducto
//router.delete("/eliminar/:idProducto/:idTamano", eliminarTamañoXProducto);

module.exports = router;
