import { Producto } from "../models/producto.model";  // Asegúrate de tener el modelo adecuado para Producto
import { Categoria } from "../models/categoria.model";  // Importar modelos relacionados si es necesario
import { Subcategoria } from "../models/subcategoria.model";  // Importar subcategoría si es necesario

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
                    as: "categoria",  // Relación con la categoría
                    attributes: ["idCategoria", "nombre"]
                },
                {
                    model: Subcategoria,
                    as: "subcategoria",  // Relación con la subcategoría
                    attributes: ["idSubcategoria", "nombre"]
                }
            ]
        });
        res.status(200).json(productos);
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

// Eliminar producto por nombre
export const eliminarProducto = async (req, res) => {
    const { nombre } = req.params;
    try {
        const producto = await Producto.findOne({ where: { nombre: nombre } });
        if (producto) {
            await producto.destroy();
            res.status(204).json({ message: "Producto eliminado" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Editar producto por nombre
export const editarProducto = async (req, res) => {
    const { nombre } = req.params;  // Nombre del producto actual que se busca
    const { idCategoria, idSubcategoria, nuevoNombre, descripcion, precio, personalizacion, imagen, tipo, estado } = req.body;  // Recibe los datos del cuerpo de la solicitud

    try {
        // Buscar el producto por nombre
        const productoExistente = await Producto.findOne({ where: { nombre } });
        
        if (productoExistente) {
            // Preparamos los datos a actualizar, solo con los campos que han sido modificados
            const datosAActualizar = {};

            if (nuevoNombre) datosAActualizar.nombre = nuevoNombre;
            if (idCategoria) datosAActualizar.idCategoria = idCategoria;
            if (idSubcategoria) datosAActualizar.idSubcategoria = idSubcategoria;
            if (descripcion) datosAActualizar.descripcion = descripcion;
            if (precio) datosAActualizar.precio = precio;
            if (personalizacion) datosAActualizar.personalizacion = personalizacion;
            if (imagen) datosAActualizar.imagen = imagen;
            if (tipo) datosAActualizar.tipo = tipo;
            if (estado) datosAActualizar.estado = estado;

            // Realiza la actualización de los campos que se han modificado
            await Producto.update(datosAActualizar, { where: { nombre } });
            res.status(200).json({ message: "Producto editado exitosamente" });

        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error(error);  // Para ver detalles del error en la consola
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
