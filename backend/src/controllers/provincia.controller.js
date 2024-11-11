import { Provincia } from "../models/provincia.model";

export const visualizarProvincia = async (req, res) => {
    try {
        const provincia = await Provincia.findAll();
        console.log(Provincia.findAll());
        res.status(200).json(provincia);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}; 

