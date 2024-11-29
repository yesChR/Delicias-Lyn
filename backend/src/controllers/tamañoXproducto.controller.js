import { TamañoXProducto } from "../models/tamañoXproducto.model";
import { Tamaño } from "../models/tamaño.model";
import { Producto } from "../models/producto.model";
import { Categoria } from "../models/categoria.model"; // Modelo de la categoría
import { Subcategoria } from "../models/subcategoria.model";
import { Op } from "sequelize"; // Para realizar búsquedas avanzadas


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

// Filtrar TamañosXProductos por subcategoría
export const filtrarTamañoXProductoPorSubcategoria = async (req, res) => {
    const { idSubcategoria } = req.params; // Obtenemos el ID de la subcategoría desde los parámetros
    try {
        const tamañosXProductos = await TamañoXProducto.findAll({
            include: [
                {
                    model: Producto,
                    as: "producto",
                    where: { idSubcategoria }, // Filtramos por subcategoría
                    attributes: ["idProducto", "nombre", "descripcion", "precio", "tipo", "imagen"],
                    include: [
                        {
                            model: Categoria,
                            as: "categoria",
                            attributes: ["idCategoria", "nombre"]
                        },
                        {
                            model: Subcategoria,
                            as: "subcategoria",
                            attributes: ["idSubcategoria", "nombre"]
                        }
                    ]
                },
                {
                    model: Tamaño,
                    as: "tamaño",
                    attributes: ["idTamaño", "nombre"]
                }
            ]
        });

        if (tamañosXProductos.length > 0) {
            res.status(200).json(tamañosXProductos);
        } else {
            res.status(404).json({ error: "No se encontraron productos con los tamaños en esta subcategoría" });
        }
    } catch (error) {
        console.error("Error al filtrar TamañoXProducto por subcategoría:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const filtrarTamañoXProductoPorNombre = async (req, res) => {
    const { nombre } = req.params; // Obtenemos el ID de la subcategoría desde los parámetros
    try {
        const tamañosXProductos = await TamañoXProducto.findAll({
            include: [
                {
                    model: Producto,
                    as: "producto",
                    where: {
                        nombre: {
                            [Op.like]: `%${nombre}%`
                        }
                    }, // Filtramos por subcategoría
                    attributes: ["idProducto", "nombre", "descripcion", "precio", "tipo", "imagen"],
                    include: [
                        {
                            model: Categoria,
                            as: "categoria",
                            attributes: ["idCategoria", "nombre"]
                        },
                        {
                            model: Subcategoria,
                            as: "subcategoria",
                            attributes: ["idSubcategoria", "nombre"]
                        }
                    ]
                },
                {
                    model: Tamaño,
                    as: "tamaño",
                    attributes: ["idTamaño", "nombre"]
                }
            ]
        });

        if (tamañosXProductos.length > 0) {
            res.status(200).json(tamañosXProductos);
        } else {
            res.status(404).json({ error: "No se encontraron productos con los tamaños en esta subcategoría" });
        }
    } catch (error) {
        console.error("Error al filtrar TamañoXProducto por subcategoría:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};