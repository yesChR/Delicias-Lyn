import { Categoria } from "../models/categoria.models";
import { Subcategoria } from "../models/subcategoria.models";

export const crearSubcategoria = async (req, res) => {
    const { idSubcategoria } = req.params;
    const { nombre } = req.body;

    console.log(`ID: ${idSubategoria}`);
    console.log(`Nombre Subcategoria: ${nombre}`);

    res.status(200).send({ message: "Datos", idSubcategoria, nombre });
};

export const visualizarSubcategorias = async (req, res) => {
    try {
        const subcategorias = await Subcategoria
            .findAll({
                include: {
                    model:Categoria,
                    as: "categoria",
                    attributes:["idCategoria","nombre"]
                }
            });
        res.status(200).json(subcategorias);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" })
    }
}