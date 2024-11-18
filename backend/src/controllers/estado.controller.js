import { Estado } from "../models/estado.model";

export const visualizarEstado = async (req, res) => {
    try {
        const estado = await Estado.findAll();
        res.status(200).json(estado);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};