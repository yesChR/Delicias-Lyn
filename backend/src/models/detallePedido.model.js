import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";

export const DetallePedido = sequelize.define("detalleXPedido", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: DataTypes.INTEGER,
    montoXCantidad: DataTypes.DOUBLE,
    personalizacion: DataTypes.STRING
}, {
    freezeTableName: true,
    tableName: 'detallexpedido',
});


