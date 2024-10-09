import { SELECT } from "sequelize/lib/query-types";
import { Categoria } from "../models/categoria.models";
import { Subcategoria } from "../models/subcategoria.models";

//+*****************************************************************************************************

export const crearSubcategoria = async (req, res) => {
    const { nombre } = req.body;
    const { idCategoria } = req.params;
    try {
        const existeSubcategoria = await Subcategoria.findOne({ where: { nombre: nombre } });
        const existeCategoria = await Categoria.findByPk(idCategoria);
        console.log(existeCategoria);
        if (existeCategoria !== null) {// existe
            if (existeSubcategoria === null) {//no existe
                const nuevaSubcategoria = await Subcategoria.create({ idCategoria, nombre });
                res.status(201).json({ message: "Subcategoria creada exitosamente" });
            } else {
                res.status(409).json({ error: "La subcategoria ya existe" })
            }
        }
        else {
            res.status(409).json({ error: "La categoria no existe" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno en el servidor" })
    }
};

export const visualizarSubcategorias = async (req, res) => {
    try {
        const subcategorias = await Subcategoria
            .findAll({
                include: {
                    model: Categoria,
                    as: "categoria",
                    attributes: ["idCategoria", "nombre"]
                }
            });
        res.status(200).json(subcategorias);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export const filtrarPorId = async (req, res) => {
    const { idSubcategoria } = req.params;
    try {
        const subcategoria = await Subcategoria.findByPk(id);//busca por id
        if (subcategoria !== null) {
            res.status(200).json(subcategoria);
        } else {
            res.status(404).json({ error: "Subcategoria no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


//recordar agregar condición de si existe producto dentro
export const eliminarSubcategoria = async (req, res) => {
    const { idSubcategoria } = req.params;
    try {
        const subcategoria = await Subcategoria.findByPk(idSubcategoria);//busca por id
        if (subcategoria !== null) {
            await subcategoria.destroy();
            res.status(204).json({ error: "Subcategoria eliminada" });
        }
        else {
            res.status(404).json({ error: "Subcategoria no existe" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}


export const editarSubcategoria = async (req, res) => {
    const { idSubcategoria } = req.params;
    const { idCategoria } = req.params;
    const { nombre } = req.body;
    try {
        const existeSubcategoria = await Subcategoria.findByPk(idSubcategoria);
        const existeCategoria = await Categoria.findByPk(idCategoria);
        const existeNombre = await Subcategoria.findOne({ where: { nombre: nombre } });
        if (existeCategoria !== null) {
            if (existeSubcategoria !== null) {
                if (existeNombre === null) {
                    const subcategoriaEditada = await Subcategoria.update({ nombre }, { where: { idSubcategoria: idSubcategoria } });
                    res.status(201).json({ error: "Subcategoria editada exitosamente" });
                } else {
                    res.status(204).json({ error: "El nombre de la subcategoria ya existe" });
                }
            } else {
                res.status(409).json({ error: "La subcategoria seleccionada no existe" })
            }
        } else {
            res.status(404).json({ error: "La categoria seleccionada no existe" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno en el servidor" })
    }
};


