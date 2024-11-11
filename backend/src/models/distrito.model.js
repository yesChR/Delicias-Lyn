import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Direccion } from "./direccion.model";

export const Distrito = sequelize.define("distrito", {
    idDistrito: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement:true
    },
    nombre: DataTypes.STRING,
}, {
    freezeTableName: true, 
    tableName: 'distrito',
  });

//el 1
Distrito.hasMany(Direccion, {
    foreignKey: 'idDistrito', 
    sourceKey: 'idDistrito',
    as: 'direccion' 
});

//va al muchos
Direccion.belongsTo(Distrito, {
    foreignKey: 'idDistrito', 
    targetKey: 'idDistrito', 
    as: 'distrito'
});