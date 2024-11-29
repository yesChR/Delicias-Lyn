import { Producto } from "../models/producto.model"; // Modelo del producto
import { Categoria } from "../models/categoria.model"; // Modelo de la categoría
import { Subcategoria } from "../models/subcategoria.model"; // Modelo de la subcategoría
import { Op } from "sequelize"; // Para realizar búsquedas avanzadas

// Crear producto
export const crearProducto = async (req, res) => {
    const { idCategoria, idSubcategoria, nombre, descripcion, precio, personalizacion, imagen, tipo, estado } = req.body;
    console.log(req.body);
    try {
        const productoExistente = await Producto.findOne({ where: { nombre: nombre } });
        if (!productoExistente) {
            const nuevoProducto = await Producto.create({
                idCategoria, idSubcategoria, nombre, descripcion, precio, personalizacion, imagen, tipo, estado
            });
            console.log(nuevoProducto);
            res.status(201).json({ message: "Producto creado exitosamente" });
        } else {
            res.status(409).json({ error: "El producto ya existe" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno en el servidor" });
    }
};

// Visualizar productos (incluyendo categorías y subcategorías relacionadas)
export const visualizarProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [
                {
                    model: Categoria,
                    as: "categoria", // Relación con la categoría
                    attributes: ["idCategoria", "nombre"]
                },
                {
                    model: Subcategoria,
                    as: "subcategoria", // Relación con la subcategoría
                    attributes: ["idSubcategoria", "nombre"]
                }
            ]
        });
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Filtrar producto por ID
export const filtrarProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findOne({
            where: { idProducto: id },
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
        });
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Filtrar producto por nombre
export const filtrarProductoPorNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        const producto = await Producto.findOne({
            where: { nombre: nombre },
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
        });
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Filtrar productos por subcategoría
export const filtrarProductoPorSubcategoria = async (req, res) => {
    const { idSubcategoria } = req.params; // Obtenemos el ID de la subcategoría desde los parámetros
    try {
        const productos = await Producto.findAll({
            where: { idSubcategoria },
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
        });

        if (productos.length > 0) {
            res.status(200).json(productos);
        } else {
            res.status(404).json({ error: "No se encontraron productos en esta subcategoría" });
        }
    } catch (error) {
        console.error("Error al filtrar productos por subcategoría:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar producto por ID
export const eliminarProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findByPk(id);
        if (producto) {
            await producto.destroy();
            res.status(200).json({ message: "Producto eliminado exitosamente" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Editar producto por ID
export const editarProductoPorId = async (req, res) => {
    const { id } = req.params;
    const { nuevoNombre, descripcion, precio, personalizacion, imagen, tipo, estado, idCategoria, idSubcategoria } = req.body;

    console.log(`ID del producto: ${id}`);
    console.log(`Datos para actualizar:`, req.body);

    try {
        const productoExistente = await Producto.findByPk(id);

        if (productoExistente) {
            const datosAActualizar = {};

            if (nuevoNombre) datosAActualizar.nombre = nuevoNombre;
            if (descripcion) datosAActualizar.descripcion = descripcion;
            if (precio) datosAActualizar.precio = precio;
            if (personalizacion) datosAActualizar.personalizacion = personalizacion;
            if (imagen) datosAActualizar.imagen = imagen;
            if (tipo) datosAActualizar.tipo = tipo;
            if (estado) datosAActualizar.estado = estado;
            if (idCategoria) datosAActualizar.idCategoria = idCategoria;
            if (idSubcategoria) datosAActualizar.idSubcategoria = idSubcategoria;

            await Producto.update(datosAActualizar, { where: { idProducto: id } });
            res.status(200).json({ message: "Producto editado exitosamente" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};



export const filtrarProductoLupa = async (req, res) => {
    const { nombre } = req.params;
    try {
        const productos = await Producto.findAll({
            where: {
                nombre: {
                    [Op.like]: `%${nombre}%`
                } 
            },
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
        });
        if (productos.length > 0) {
            res.status(200).json(productos);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


