import { Distrito } from "../models/distrito.model";


export const visualizarDistrito = async (req, res) => {
    try {
        const distrito = await Distrito.findAll();
        res.status(200).json(distrito);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

