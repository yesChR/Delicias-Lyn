import { Pedido } from "../models/pedido.model";
import { Op } from "sequelize";
import moment from "moment";

export const visualizarInforme = async (req, res) => {
    const { fechaInicio, fechaFin } = req.body;

    // Verificar si se proporcionan las fechas
    if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ error: "Debe proporcionar 'fechaInicio' y 'fechaFin'." });
    }

    // Validar formato de las fechas
    if (!moment(fechaInicio, "YYYY-MM-DD", true).isValid() || !moment(fechaFin, "YYYY-MM-DD", true).isValid()) {
        return res.status(400).json({ error: "Las fechas deben estar en el formato 'YYYY-MM-DD'." });
    }

    // Definir el inicio y fin del rango de fechas
    let inicio, fin;

    try {
        inicio = moment(fechaInicio, "YYYY-MM-DD").startOf('day').toDate();
        fin = moment(fechaFin, "YYYY-MM-DD").endOf('day').toDate();
    } catch (error) {
        console.error("Error al calcular el rango de fechas:", error);
        return res.status(500).json({ error: "Error interno al calcular el rango de fechas." });
    }

    // Consultar los pedidos en el rango de fechas proporcionado
    try {
        const pedidos = await Pedido.findAll({
            where: {
                fechaEntrega: {
                    [Op.gte]: inicio,
                    [Op.lt]: fin,
                },
            },
        });

        res.json({ pedidos });
    } catch (error) {
        console.error("Error al obtener los datos :", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
