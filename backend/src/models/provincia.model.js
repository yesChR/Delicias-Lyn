import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Canton } from "./canton.model";
import { Direccion } from "./direccion.model";

export const Provincia = sequelize.define("provincia", {
    idProvincia: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement:true
    },
    nombre: DataTypes.STRING,
}, {
    freezeTableName: true, 
    tableName: 'provincia',   
  });

//el 1
Provincia.hasMany(Canton, {
    foreignKey: 'idProvincia', 
    sourceKey: 'idProvincia',
    as: 'canton' 
});

//va al muchos
Canton.belongsTo(Provincia, {
    foreignKey: 'idProvincia', 
    targetKey: 'idProvincia', 
    as: 'provincia'
});

//el 1
Provincia.hasMany(Direccion, {
    foreignKey: 'idProvincia', 
    sourceKey: 'idProvincia',
    as: 'direccion' 
});

//va al muchos
Direccion.belongsTo(Provincia, {
    foreignKey: 'idProvincia', 
    targetKey: 'idProvincia', 
    as: 'provincia'
});
