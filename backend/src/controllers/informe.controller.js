import { Pedido } from "../models/pedido.model";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Op } from "sequelize";
import moment from "moment";

export const visualizarPedidoPDF = async (req, res) => {
    const { rango, mes } = req.params;

    if (!['diario', 'mensual', 'anual'].includes(rango)) {
        return res.status(400).json({ error: "Rango inválido. Usa 'diario', 'mensual' o 'anual'." });
    }

    let fechaInicio;
    let fechaFin;

    if (rango === 'mensual') {
        if (!mes) {
            return res.status(400).json({ error: "Debes especificar el mes en formato numérico (1 a 12) para el informe mensual." });
        }
        fechaInicio = moment().month(mes - 1).startOf('month').toDate();
        fechaFin = moment().month(mes - 1).endOf('month').toDate();
    } else if (rango === 'anual') {
        fechaInicio = moment().startOf('year').toDate();
        fechaFin = moment().endOf('year').toDate();
    } else if (rango === 'diario') {
        fechaInicio = moment().startOf('day');
        fechaFin = moment().endOf('day');
    }

    // Función para formatear el monto
    const formatearMonto = (monto) => {
        if (monto >= 1000) {
            return `${monto.toLocaleString({ maximumFractionDigits: 0 })}`; // Con separador de miles y sin decimales
        } else {
            return `${monto}`;  // Si es menor a 1000, lo mostramos sin separador
        }
    };

    try {
        const pedidos = await Pedido.findAll({
            where: {
                fechaEntrega: {
                    [Op.between]: [fechaInicio, fechaFin],
                },
            },
        });

        if (pedidos.length === 0) {
            return res.status(404).json({ error: "No se encontraron pedidos para este rango de fechas" + fechaInicio });
        }

        // Calcular el ingreso total sumando el montoTotal de todos los pedidos
        const ingresoTotal = pedidos.reduce((total, pedido) => total + pedido.montoTotal, 0);

        // Crear una nueva instancia de jsPDF
        const doc = new jsPDF();

        // Establecer el título del documento
        doc.setFontSize(18);
        doc.text("Lista de Pedidos", 20, 20); // Título en la posición 20, 20

        // Configurar Moment.js para usar español
        moment.locale('es');  // Establecer el idioma en español

        // Agregar el rango al lado del título
        doc.setFontSize(12);
        let textoRango = `Rango: ${rango.charAt(0).toUpperCase() + rango.slice(1)}`;  // Capitaliza el primer carácter del rango

        if (rango === 'mensual') {
            // Si es mensual, incluir el mes
            const nombreMes = moment().month(mes - 1).format('MMMM YYYY'); // Obtener el nombre del mes y el año en español
            textoRango = `Rango: Mensual (${nombreMes})`;
        } else if (rango === 'diario') {
            textoRango = `Rango: Diario (Hoy)`;
        } else if (rango === 'anual') {
            textoRango = `Rango: Anual (${moment().year()})`;
        }

        // Colocar el texto del rango al lado del título
        doc.text(textoRango, 120, 20); // Posición ajustada a 120 en el eje X (al lado del título)

        // Establecer los encabezados de la tabla
        const encabezados = [["#", "Nombre Completo", "Monto Total", "Fecha de Entrega"]];

        // Mapear los datos de los pedidos en filas para la tabla
        const datos = pedidos.map((pedido, index) => [
            index + 1,
            `${pedido.nombre} ${pedido.apellidoUno} ${pedido.apellidoDos}`,
            formatearMonto(pedido.montoTotal), // Aplicamos la función para formatear el monto
            moment(pedido.fechaEntrega).format('YYYY-MM-DD')
        ]);
        // Ordenar los pedidos por fecha de entrega
        const pedidosOrdenados = pedidos.sort((a, b) => moment(a.fechaEntrega).isBefore(b.fechaEntrega) ? -1 : 1);

        // Crear el PDF y mostrar los pedidos ya ordenados
        const orden = pedidosOrdenados.map((pedido, index) => [
            index + 1,
            `${pedido.nombre} ${pedido.apellidoUno} ${pedido.apellidoDos}`,
            formatearMonto(pedido.montoTotal),
            moment(pedido.fechaEntrega).format('YYYY-MM-DD')
        ]);

        // Agregar la tabla al PDF
        autoTable(doc, {
            startY: 30,
            head: encabezados,
            body: orden,
            theme: 'grid',
            headStyles: { fillColor: [22, 160, 133] },
            bodyStyles: { textColor: [0, 0, 0] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
        });
        // Agregar el ingreso total debajo de la tabla
        const finalY = doc.previousAutoTable.finalY + 10;  // Posición después de la tabla
        doc.setFontSize(14);
        doc.text(`Ingreso total de pedidos: ${formatearMonto(ingresoTotal)}`, 20, finalY); // Aplicamos la función para formatear el monto

        // Enviar el PDF como respuesta
        const pdfOutput = doc.output("arraybuffer");

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=pedidos.pdf");
        res.status(200).send(Buffer.from(pdfOutput));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
