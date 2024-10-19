import { Canton } from "../models/canton.model";

export const visualizarCanton = async (req, res) => {
    try {
        const canton = await Canton.findAll();
        res.status(200).json(canton);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

