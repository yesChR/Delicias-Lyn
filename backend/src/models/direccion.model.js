import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Pedido } from "./pedido.model";

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

//el 1
Direccion.hasMany(Pedido, {
    foreignKey: 'idDireccion', 
    sourceKey: 'idDireccion', 
    as: 'pedidos' 
});

//va al muchos
Pedido.belongsTo(Direccion, {
    foreignKey: 'idDireccion', 
    targetKey: 'idDireccion', 
    as: 'direccion'
});