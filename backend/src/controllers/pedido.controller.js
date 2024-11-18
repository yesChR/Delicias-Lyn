import { Estado } from "../models/estado.model";
import { Direccion } from "../models/direccion.model";
import { Carrito } from "../models/carrito.model";
import { Pedido } from "../models/pedido.model";
import { Canton } from "../models/canton.model";
import { Distrito } from "../models/distrito.model";
import { Provincia } from "../models/provincia.model";
import { DetallePedido } from "../models/detallePedido.model";
import { Producto } from "../models/producto.model";
import { Categoria } from "../models/categoria.model";
import { Subcategoria } from "../models/subcategoria.model";
import { Tamaño } from "../models/tamaño.model";
import { sequelize } from "../bd_config/conexion";
import transporter from "../config/nodemailer";
import config from "../config/config";

export const crearPedido = async (req, res) => {
    const { idUsuario, idEstado, idCanton, idDistrito, idProvincia, direccionExacta, nombre, apellidoUno,
        apellidoDos, correo, telefono, metodoEntrega, metodoPago, fechaEntrega, prioridad, montoTotal } = req.body;

    const t = await sequelize.transaction(); // Iniciar la transacción

    try {
        // Obtener el estado
        const estado = await Estado.findOne({ where: { idEstado } });

        // Obtener los datos del carrito
        const datosCarrito = await Carrito.findAll({ where: { idUsuario } });

        console.log("Datos Carrito", datosCarrito);

        if (datosCarrito.length > 0) {
            // Crear la dirección dentro de la transacción
            const direccionCliente = await Direccion.create({
                idCanton,
                idDistrito,
                idProvincia,
                direccionExacta
            }, { transaction: t });

            const lastInsertedId = direccionCliente.idDireccion;

            // Crear el pedido dentro de la transacción
            const nuevoPedido = await Pedido.create({
                idUsuario,
                idEstado: estado.idEstado,
                idDireccion: lastInsertedId,
                nombre,
                apellidoUno,
                apellidoDos,
                correo,
                telefono,
                metodoEntrega,
                metodoPago,
                fechaEntrega,
                prioridad,
                montoTotal
            }, { transaction: t });

            // Crear el detalle del pedido
            const detalle = datosCarrito.map((item) => {
                const datos = item.toJSON();
                return {
                    idProducto: datos.idProducto,
                    idPedido: nuevoPedido.idPedido,
                    idTamaño: datos.idTamaño,
                    cantidad: datos.cantidad,
                    montoXCantidad: datos.montoXCantidad,
                    personalizacion: datos.personalizacion
                }
            });

            console.log(detalle);

            // Insertar los detalles del pedido en la base de datos
            await DetallePedido.bulkCreate(detalle, { transaction: t });

            // Eliminar el carrito después de crear el pedido
            await Carrito.destroy({ where: { idUsuario: idUsuario }, transaction: t });

            //se envia correo para Admin
            const correoAdmin = {
                from: config.email,
                to: config.email,
                subject: 'Delicias Lyn - Nuevo Pedido',
                html: `
                    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px; width: 100%; max-width: 600px; margin: auto;">
                        <h2 style="color: #333; text-align: center; font-size: 24px;">Nuevo Pedido Recibido</h2>
                        <p style="font-size: 16px; color: #333;">Hola Arlyn,</p>
                        <p style="font-size: 16px; color: #333;">Tienes un nuevo pedido en tu lista. Por favor, revisa los detalles a continuación:</p>
                        <div style="background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
                            <p style="font-size: 16px; color: #333;">¡Gracias por tu gestión!</p>
                        </div>
                        <p style="font-size: 14px; color: #777; text-align: center;">Este correo es generado automáticamente. No respondas a este mensaje.</p>
                    </div>
                `
            };


            //se envia correo para cliente
            const correoCliente = {
                from: config.email,
                to: correo,
                subject: 'Delicias Lyn - Pedido Confirmado',
                html: `
                    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px; width: 100%; max-width: 600px; margin: auto;">
                        <h2 style="color: #333; text-align: center; font-size: 24px;">¡Tu Pedido ha sido Registrado Exitosamente!</h2>
                        <p style="font-size: 16px; color: #333;">Hola ${nombre},</p>
                        <p style="font-size: 16px; color: #333;">¡Gracias por confiar en Delicias Lyn! Hemos recibido tu pedido con el número de referencia <strong>${nuevoPedido.idPedido}</strong>.</p>
                        <div style="background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
                            <p style="font-size: 16px; color: #333;">A continuación, se detallan los datos de tu pedido:</p>
                            <ul style="font-size: 16px; color: #333; list-style: none; padding-left: 0;">
                                <li><strong>Nombre:</strong> ${nombre} ${apellidoUno} ${apellidoDos}</li>
                                <li><strong>Correo:</strong> ${correo}</li>
                                <li><strong>Teléfono:</strong> ${telefono}</li>
                                <li><strong>Fecha de Entrega:</strong> ${fechaEntrega}</li>
                                <li><strong>Monto Total:</strong> $${montoTotal}</li>
                            </ul>
                            <p style="font-size: 16px; color: #333;">Te contactaremos pronto con más detalles sobre el estado de tu pedido.</p>
                        </div>
                        <p style="font-size: 14px; color: #777; text-align: center;">Este correo es generado automáticamente. No respondas a este mensaje.</p>
                    </div>
                `
            };


            await transporter.sendMail(correoAdmin);
            await transporter.sendMail(correoCliente);

            // Si todo sale bien, commit de la transacción
            await t.commit();
            res.status(201).json({ message: "Pedido creado exitosamente" });
        } else {
            res.status(409).json({ error: "No se pudo crear el pedido. Verifique el carrito." });
        }
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        await t.rollback();
        res.status(500).json({ error: "Error interno en el servidor" });
    }
};


export const visualizarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [{
                model: Estado,
                as: "estado",
                attributes: ["idEstado", "nombre"]
            },
            {
                model: Direccion,
                as: "direccion",
                attributes: ["idDireccion", "direccionExacta"],
                include: [
                    { model: Provincia, as: "provincia", attributes: ['nombre'] },
                    { model: Canton, as: "canton", attributes: ['nombre'] },
                    { model: Distrito, as: "distrito", attributes: ['nombre'] },
                ],
            },
            {
                model: DetallePedido,
                as: "detalle",
                attributes: ["idPedido", "idProducto", "cantidad", "montoXCantidad", "personalizacion"],
                include: [
                    {
                        model: Producto, as: "producto",
                        attributes: ['nombre', 'precio', 'descripcion', 'tipo', 'estado'],
                        include: [
                            {
                                model: Categoria, as: "categoria",
                                attributes: ['idCategoria', 'nombre']
                            },
                            {
                                model: Subcategoria, as: "subcategoria",
                                attributes: ['idSubcategoria', 'nombre']
                            },
                        ]
                    },
                    {
                        model: Tamaño,
                        as: "tamaño",
                        attributes: ['idTamaño', 'nombre'],
                    }
                ],
            },
            ]
        });
        res.status(200).json(pedidos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const editarEstado = async (req, res) => {
    const { idPedido } = req.params;
    const { idEstado } = req.body;
    try {
        const existePedido = await Pedido.findByPk(idPedido);
        if (existePedido !== null) {
            const existeEstado = await Estado.findByPk(idEstado);
            if (existeEstado !== null) {
                const estadoPedidoEdit = await Pedido.update({ idEstado }, { where: { idPedido: idPedido } });
                const formato = {
                    from: config.email,
                    to: existePedido.correo,
                    subject: 'Delicias Lyn',
                    html: `
                        <p>Hola ${existePedido.nombre}, el estado de su pedido <strong>${idPedido}</strong> 
                        a cambiado a: ${existeEstado.nombre}.</p>
                    `
                };

                await transporter.sendMail(formato);
                res.status(201).json({ message: "Estado del pedido editado exitosamente" });
            } else {
                res.status(404).json({ error: "El estado no existe" });
            }
        }
        else {
            res.status(404).json({ error: "El pedido no existe" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno en el servidor" });
    }
}

export const editarPrioridad = async (req, res) => {
    const { idPedido } = req.params;
    const { prioridad } = req.body;
    try {
        const existePedido = await Pedido.findByPk(idPedido);
        if (existePedido !== null) {
            const prioridadPedidoEdit = await Pedido.update({ prioridad }, { where: { idPedido: idPedido } });
            res.status(201).json({ message: "Prioridad del pedido editado exitosamente" });
        }
        else {
            res.status(404).json({ error: "El pedido no existe" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno en el servidor" });
    }
}
