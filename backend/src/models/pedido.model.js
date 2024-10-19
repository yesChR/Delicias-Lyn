import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";

export const Pedido = sequelize.define("pedido",{
    idPedido:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    apellidoUno: DataTypes.STRING,
    apellidoDos: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    metodoEntrega: DataTypes.INTEGER,
    metodoPago: DataTypes.INTEGER,
    fechaEntrega: DataTypes.DATE,
    prioridad: DataTypes.INTEGER,
    montoTotal: DataTypes.DOUBLE
}, {
    freezeTableName: true, // Esto evitará que Sequelize pluralice el nombre de la tabla
    tableName: 'pedido',   // De manera opcional, puedes especificar el nombre exacto de la tabla
  });
