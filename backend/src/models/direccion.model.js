import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";

export const Direccion = sequelize.define("direccion", {
    idDireccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    direccionExacta: DataTypes.STRING,
}, {
    freezeTableName: true, 
    tableName: 'direccion',   
});

