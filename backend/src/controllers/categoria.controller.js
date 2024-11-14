import { Categoria } from "../models/categoria.model";
import { Subcategoria } from "../models/subcategoria.model";

export const crearCategoria = async (req, res) => {
    const { nombre } = req.body;
    try {
        const existeCategoria = await Categoria.findOne({ where: { nombre: nombre } }); //consulta a la bd
        if (existeCategoria === null) {
            const nuevaCategoria = await Categoria.create({ nombre });
            res.status(201).json({ message: "Categoria creada exitosamente" });
        }
        else {
            res.status(409).json({ error: "La categoria ya existe" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno en el servidor" })
    }
};

export const visualizarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria
            .findAll({
                include: {
                    model: Subcategoria,
                    as: "subcategoria",
                    attributes: ["idSubcategoria", "nombre"]
                }
            });
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const filtrarPorId = async (req, res) => {
    const { idCategoria } = req.params;
    try {
        const categoria = await Categoria.findByPk(idCategoria);//busca por id
        if (categoria !== null) {
            res.status(200).json(categoria);
        } else {
            res.status(404).json({ error: "Categoria no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const eliminarCategoria = async (req, res) => {
    const { idCategoria } = req.params;
    try {
        const categoria = await Categoria.findByPk(idCategoria, {
            include: {
                model: Subcategoria,
                as: "subcategoria",
                attributes: ["idSubcategoria", "nombre"]
            }
        });//busca por id
        if (categoria !== null) {
            console.log(categoria);
            if (categoria.subcategoria.length === 0) {
                await categoria.destroy();
                res.status(204).json({ error: "Categoria eliminada" });
            } else {
                res.status(409).json({ error: "La categoria contiene subcategorias" });
            }
        } else {
            res.status(404).json({ error: "Categoria no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const editarCategoria = async (req, res) => {
    const { idCategoria } = req.params;
    const { nombre } = req.body; //recibe lo que modifica
    try {
        const existeCategoria = await Categoria.findByPk(idCategoria);
        if (existeCategoria !== null) {
            const existeNombre = await Categoria.findOne({ where: { nombre: nombre } });
            if (existeNombre === null) {
                const categoriaEditada = await Categoria.update({ nombre }, { where: { idCategoria: idCategoria } });
                res.status(201).json({ message: "Categoria editada exitosamente" });
            } else {
                res.status(409).json({ error: "El nombre de la categoria ya existe" })
            }
        }
        else {
            res.status(404).json({ error: "La categoria no existe" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno en el servidor" })
    }
};


