import express from "express";
import {
    crearTamañoXProducto,
    obtenerTamañosXProductos,
    obtenerTamañoXProductoPorId,
    actualizarTamañoXProducto,
    eliminarTamañoXProducto,
    filtrarTamañoXProductoPorSubcategoria, 
    filtrarTamañoXProductoPorNombre
} from "../controllers/tamañoXproducto.controller";

const router = express.Router();

// Ruta para crear una nueva relación TamañoXProducto
router.post("/crear", crearTamañoXProducto);

// Ruta para obtener todas las relaciones TamañoXProducto
router.get("/visualizar", obtenerTamañosXProductos);

// Ruta para filtrar TamañoXProducto por idSubcategoria
router.get("/filtrar/subcategoria/:idSubcategoria", filtrarTamañoXProductoPorSubcategoria);  // Nueva ruta para filtrar por subcategoría

router.get("/filtrar/nombre/:nombre", filtrarTamañoXProductoPorNombre);

module.exports = router;
