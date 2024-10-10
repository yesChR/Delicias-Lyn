import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Distrito } from "./distrito.model";

export const Canton = sequelize.define("canton", {
    idCanton: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement:true
    },
    nombre: DataTypes.STRING,
});

//el 1
Canton.hasMany(Distrito, {
    foreignKey: 'idCanton', 
    sourceKey: 'idCanton',
    as: 'distrito' 
});

//va al muchos
Distrito.belongsTo(Canton, {
    foreignKey: 'idCanton', 
    targetKey: 'idCanton', 
    as: 'canton'
});