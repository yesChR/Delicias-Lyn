import { Provincia } from "../models/provincia.model";
import { Canton } from "../models/canton.model";
import { Distrito } from "../models/distrito.model";

export const visualizarProvincia = async (req, res) => {
    try {
        const provincia = await Provincia.findAll();
        console.log(Provincia.findAll());
        res.status(200).json(provincia);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}; 

export const visualizarProvLimon = async (req, res) => {
    try {
        const provincia = await Provincia.findOne({
            where: {
                idProvincia: 7
            },
            include: [
                {
                    model: Canton,  // Incluir los cantones
                    as: "canton",   // Especificamos el alias de la relación
                    attributes: ['idCanton', 'nombre'], // Campos a incluir de Canton
                    include: [
                        {
                            model: Distrito,  // Incluir los distritos relacionados con el canton
                            as: "distrito",  // Alias para la relación Distrito
                            attributes: ['idDistrito', 'nombre'] // Campos a incluir de Distrito
                        }
                    ]
                }
            ]
        });

        if (!provincia) {
            return res.status(404).json({ error: "Provincia no encontrada" });
        }

        res.status(200).json(provincia);  // Devuelve la provincia, cantones y distritos
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};



