import { Pedido } from "../models/pedido.model";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Op } from "sequelize";
import moment from "moment";

export const visualizarPedidoPDF = async (req, res) => {
    const { rango } = req.params; // rango es el único parámetro en la URL
    const { mes, fechaInicio, fechaFin } = req.query; // Los otros parámetros vienen en la query

    console.log("Parámetros recibidos:", { rango, mes, fechaInicio, fechaFin }); // Depuración

    // Validación del rango
    if (!['diario', 'mensual', 'anual'].includes(rango)) {
        return res.status(400).json({ error: "Rango inválido. Usa 'diario', 'mensual' o 'anual'." });
    }

    let inicio;
    let fin;

    // Cálculo de fechas según el rango
    try {
        if (rango === 'mensual') {
            if (!mes || isNaN(mes) || mes < 1 || mes > 12) {
                return res.status(400).json({ error: "El mes debe ser un número entre 1 y 12." });
            }

            inicio = moment().month(mes - 1).startOf('month').toDate();
            fin = moment().month(mes - 1).endOf('month').toDate();
        } else if (rango === 'anual') {
            inicio = moment().startOf('year').toDate();
            fin = moment().endOf('year').toDate();
        } else if (rango === 'diario') {
            // Validar que los parámetros `fechaInicio` y `fechaFin` estén presentes
            if (!fechaInicio || !fechaFin) {
                return res.status(400).json({ error: "Debe proporcionar 'fechaInicio' y 'fechaFin' en el formato 'YYYY-MM-DD'." });
            }

            // Convertir las fechas proporcionadas en momentos para manipularlos
            inicio = moment(fechaInicio, "YYYY-MM-DD").startOf('day').toDate();
            fin = moment(fechaFin, "YYYY-MM-DD").endOf('day').toDate();
        }

        console.log("Rango de fechas calculado:", { inicio, fin });
    } catch (error) {
        console.error("Error al calcular el rango de fechas:", error);
        return res.status(500).json({ error: "Error interno al calcular el rango de fechas." });
    }

    // Función para formatear el monto
    const formatearMonto = (monto) => {
        return monto >= 1000
            ? monto.toLocaleString(undefined, { maximumFractionDigits: 0 })
            : `${monto}`;
    };

    try {
        // Consulta a la base de datos
        const pedidos = await Pedido.findAll({
            where: {
                fechaEntrega: {
                    [Op.gte]: moment(inicio).subtract(1, 'day').startOf('day').toDate(), // Un día antes para la fecha de inicio
                    [Op.lt]: moment(fin).subtract(1, 'day').endOf('day').toDate() // Un día antes para la fecha de fin
                },
            },
        });

        console.log("Pedidos recuperados:", pedidos); // Depuración

        if (pedidos.length === 0) {
            return res.status(404).json({ error: "No se encontraron pedidos para este rango de fechas." });
        }

        // Calcular el ingreso total
        const ingresoTotal = pedidos.reduce((total, pedido) => total + pedido.montoTotal, 0);
        console.log("Ingreso total calculado:", ingresoTotal);

        // Crear el informe PDF
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Lista de Pedidos", 20, 20);

        // Configurar el rango en el informe
        moment.locale('es'); // Idioma en español
        let textoRango = `Rango: ${rango.charAt(0).toUpperCase() + rango.slice(1)}`;
        if (rango === 'mensual') {
            const nombreMes = moment().month(mes - 1).format('MMMM YYYY');
            textoRango = `Rango: Mensual (${nombreMes})`;
        } else if (rango === 'diario') {
            textoRango = "Rango: Diario";
        } else if (rango === 'anual') {
            textoRango = `Rango: Anual (${moment().year()})`;
        }
        doc.setFontSize(12);
        doc.text(textoRango, 120, 20);

        // Configurar la tabla
        const encabezados = [["#", "Nombre Completo", "Correo", "Monto Total", "Fecha de Entrega"]];
        const pedidosOrdenados = pedidos.sort((a, b) =>
            moment(a.fechaEntrega).isBefore(b.fechaEntrega) ? -1 : 1
        );

        const datosTabla = pedidosOrdenados.map((pedido, index) => [
            index + 1,
            `${pedido.nombre} ${pedido.apellidoUno} ${pedido.apellidoDos}`,
            pedido.correo,
            formatearMonto(pedido.montoTotal),
            moment(pedido.fechaEntrega).format('YYYY-MM-DD'),
        ]);

        autoTable(doc, {
            startY: 30,
            head: encabezados,
            body: datosTabla,
            theme: 'grid',
            headStyles: { fillColor: [22, 160, 133] },
            bodyStyles: { textColor: [0, 0, 0] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
        });

        // Agregar ingreso total
        const finalY = doc.previousAutoTable.finalY + 10;
        doc.setFontSize(14);
        doc.text(`Ingreso total de pedidos: ${formatearMonto(ingresoTotal)}`, 20, finalY);

        // Responder con el PDF
        const pdfOutput = doc.output("arraybuffer");
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=pedidos.pdf");
        res.status(200).send(Buffer.from(pdfOutput));
    } catch (error) {
        console.error("Error al generar el informe PDF:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
