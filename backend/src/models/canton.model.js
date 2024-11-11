import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Distrito } from "./distrito.model";
import { Direccion } from "./direccion.model";

export const Canton = sequelize.define("canton", {
    idCanton: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
}, {
    freezeTableName: true, 
    tableName: 'canton',   
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

//el 1
Canton.hasMany(Direccion, {
    foreignKey: 'idCanton', 
    sourceKey: 'idCanton',
    as: 'direccion' 
});

//va al muchos
Direccion.belongsTo(Canton, {
    foreignKey: 'idCanton', 
    targetKey: 'idCanton', 
    as: 'canton'
});