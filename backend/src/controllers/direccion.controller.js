import { Direccion } from "../models/direccion.model";

export const visualizarDireccion = async (req, res) => {
    try {
        const direccion = await Direccion.findAll();
        res.status(200).json(direccion);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

