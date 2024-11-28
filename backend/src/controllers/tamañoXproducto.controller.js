import { TamañoXProducto } from "../models/tamañoXproducto.model";
import { Tamaño } from "../models/tamaño.model";
import { Producto } from "../models/producto.model";

// Crear TamañoXProducto
export const crearTamañoXProducto = async (req, res) => {
    const { idProducto, idTamaño } = req.body; // Verifica los nombres de los campos
    try {
        // Asegúrate de que los campos no son undefined o null
        if (!idProducto || !idTamaño) {
            return res.status(400).json({ error: "idProducto y idTamaño son obligatorios" });
        }

        // Intenta crear la relación
        const nuevoTamañoXProducto = await TamañoXProducto.create({ idProducto, idTamaño });
        res.status(201).json({
            message: "TamañoXProducto creado exitosamente",
            tamañoXProducto: nuevoTamañoXProducto
        });
    } catch (error) {
        console.error("Error al crear TamañoXProducto:", error.message, error.stack);
        res.status(500).json({ error: "Error interno del servidor", detalles: error.message });
    }
};


// Obtener todas las relaciones TamañoXProducto
export const obtenerTamañosXProductos = async (req, res) => {
    try {
        const tamañosXProductos = await TamañoXProducto.findAll({
            include: [
                {
                    model: Producto,
                    as: "producto",
                    attributes: ["idProducto", "nombre", "descripcion", "precio", "tipo", "imagen"]
                },
                {
                    model: Tamaño,
                    as: "tamaño",
                    attributes: ["idTamaño", "nombre"]
                }
            ]
        });
        res.status(200).json(tamañosXProductos);
    } catch (error) {
        console.error("Error al obtener TamañosXProductos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener TamañoXProducto por ID
/*export const filtrarTamañoXProducto = async (req, res) => {
    const { idProducto, idTamano } = req.params; // Parámetros recibidos de la solicitud
    try {
        const filtro = {};
        if (idProducto) filtro.idProducto = idProducto;
        if (idTamano) filtro.idTamano = idTamano;

        const tamañoXProducto = await TamañoXProducto.findAll({
            where: filtro, // Filtrar dinámicamente con los parámetros
            include: [
                {
                    model: Producto,
                    as: "producto",
                    attributes: ["idProducto", "nombre", "descripcion", "precio", "imagen"]
                },
                {
                    model: Tamaño,
                    as: "tamano",
                    attributes: ["idTamano", "nombre"]
                }
            ]
        });

        if (tamañoXProducto.length > 0) {
            res.status(200).json(tamañoXProducto);
        } else {
            res.status(404).json({ error: "No se encontraron relaciones TamañoXProducto con los parámetros dados" });
        }
    } catch (error) {
        console.error("Error al filtrar TamañoXProducto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
*/

// Actualizar TamañoXProducto
/*export const actualizarTamañoXProducto = async (req, res) => {
    const { idProducto, idTamano } = req.params;
    try {
        const tamañoXProducto = await TamañoXProducto.findOne({ where: { idProducto, idTamano } });
        if (tamañoXProducto) {
            res.status(200).json({ message: "No hay datos editables en esta relación." });
        } else {
            res.status(404).json({ error: "TamañoXProducto no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar TamañoXProducto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
*/
// Eliminar TamañoXProducto
/*export const eliminarTamañoXProducto = async (req, res) => {
    const { idProducto, idTamano } = req.params;
    try {
        const tamañoXProducto = await TamañoXProducto.findOne({ where: { idProducto, idTamano } });
        if (tamañoXProducto) {
            await tamañoXProducto.destroy();
            res.status(200).json({ message: "TamañoXProducto eliminado exitosamente" });
        } else {
            res.status(404).json({ error: "TamañoXProducto no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar TamañoXProducto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};*/
