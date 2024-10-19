import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";

export const Distrito = sequelize.define("distrito", {
    idDistrito: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement:true
    },
    nombre: DataTypes.STRING,
}, {
    freezeTableName: true, // Esto evitará que Sequelize pluralice el nombre de la tabla
    tableName: 'distrito',   // De manera opcional, puedes especificar el nombre exacto de la tabla
  });

