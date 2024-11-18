import { Producto } from "../models/producto.model"; // Modelo del producto
import { Categoria } from "../models/categoria.model"; // Modelo de la categoría
import { Subcategoria } from "../models/subcategoria.model"; // Modelo de la subcategoría

// Crear producto
export const crearProducto = async (req, res) => {
    const { idCategoria, idSubcategoria, nombre, descripcion, precio, personalizacion, imagen, tipo, estado } = req.body;
    try {
        const productoExistente = await Producto.findOne({ where: { nombre: nombre } });
        if (!productoExistente) {
            const nuevoProducto = await Producto.create({
                idCategoria, idSubcategoria, nombre, descripcion, precio, personalizacion, imagen, tipo, estado
            });
            res.status(201).json({ message: "Producto creado exitosamente" });
        } else {
            res.status(409).json({ error: "El producto ya existe" });
        }
    } catch (error) {
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

