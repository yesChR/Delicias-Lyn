import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { DetallePedido } from "./detallePedido.model";
import { Carrito } from "./carrito.model";


export const Tamaño = sequelize.define("tamaño", {
    idTamaño: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement:true
    },
    nombre: DataTypes.STRING,
}, {
    freezeTableName: true, 
    tableName: 'tamaño',  
  });

//el 1
Tamaño.hasMany(DetallePedido, {
    foreignKey: 'idTamaño', 
    sourceKey: 'idTamaño', 
    as: 'detalle' 
});

//va al muchos
DetallePedido.belongsTo(Tamaño, {
    foreignKey: 'idTamaño', 
    targetKey: 'idTamaño', 
    as: 'tamaño'
});

Tamaño.hasMany(Carrito, {
    foreignKey: 'idTamaño', 
    sourceKey: 'idTamaño', 
    as: 'carrito' 
});

//va al muchos
Carrito.belongsTo(Tamaño, {
    foreignKey: 'idTamaño', 
    targetKey: 'idTamaño', 
    as: 'tamaño'
});