import { Pedido } from "../models/pedido.model";
import jsPDF from "jspdf";

export const generarInformeVentas = async (req, res) => {
    const { periodo } = req.params; // "diario", "mensual", o "anual"
    let fechaInicio;
    const fechaFin = new Date();

    // Calcular fecha de inicio según el periodo
    if (periodo === "diario") {
        fechaInicio = new Date();
        fechaInicio.setDate(fechaInicio.getDate() - 1);
    } else if (periodo === "mensual") {
        fechaInicio = new Date();
        fechaInicio.setMonth(fechaInicio.getMonth() - 1);
    } else if (periodo === "anual") {
        fechaInicio = new Date();
        fechaInicio.setFullYear(fechaInicio.getFullYear() - 1);
    }

    try {
        const pedidos = await Pedido.findAll({
            where: {
                fechaEntrega: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            }
        });

        // Calcular el monto total del periodo
        const montoTotal = pedidos.reduce((sum, pedido) => sum + pedido.montoTotal, 0);

        // Crear el PDF
        const doc = new jsPDF();
        doc.text("Informe de Ventas", 10, 10);
        pedidos.forEach((pedido, index) => {
            doc.text(`${index + 1}. ID: ${pedido.idPedido}, Precio: ${pedido.montoTotal}, Fecha: ${pedido.fechaEntrega}`, 10, 20 + (index * 10));
        });
        doc.text(`Monto Total del Periodo: ${montoTotal}`, 10, 20 + (pedidos.length * 10));

        // Guardar o enviar el PDF
        const pdfOutput = doc.output();
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfOutput);

    } catch (error) {
        res.status(500).json({ error: "Error generando el informe de ventas" });
    }
};
