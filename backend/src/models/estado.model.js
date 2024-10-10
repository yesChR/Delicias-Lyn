import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Pedido } from "./pedido.model";

export const Estado = sequelize.define("estado", {
    idEstado: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement:true
    },
    nombre: DataTypes.STRING,
});

//el 1
Estado.hasMany(Pedido, {
    foreignKey: 'idEstado', // Clave foránea en Pedido
    sourceKey: 'idEstado', // Clave primaria en Estado
    as: 'pedidos' // Alias para acceder a los pedidos de un estado
});

//va al muchos
Pedido.belongsTo(Estado, {
    foreignKey: 'idEstado', // Clave foránea en Pedido
    targetKey: 'idEstado', // Clave primaria en Estado
    as: 'estado' // Alias para acceder al estado de un pedido
});