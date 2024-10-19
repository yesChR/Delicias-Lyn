import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Canton } from "./canton.model"

export const Provincia = sequelize.define("provincia", {
    idProvincia: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement:true
    },
    nombre: DataTypes.STRING,
}, {
    freezeTableName: true, // Esto evitará que Sequelize pluralice el nombre de la tabla
    tableName: 'provincia',   // De manera opcional, puedes especificar el nombre exacto de la tabla
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