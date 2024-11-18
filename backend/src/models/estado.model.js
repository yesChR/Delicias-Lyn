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
}, {
    freezeTableName: true, 
    tableName: 'estado',  
  });

//el 1
Estado.hasMany(Pedido, {
    foreignKey: 'idEstado', 
    sourceKey: 'idEstado', 
    as: 'pedidos' 
});

//va al muchos
Pedido.belongsTo(Estado, {
    foreignKey: 'idEstado', 
    targetKey: 'idEstado', 
    as: 'estado'
});