// models/subcategoria.models.js
import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Categoria } from "./categoria.model"; // Asegúrate de que la ruta sea correcta

export const Subcategoria = sequelize.define("subcategoria", {
    idSubcategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: DataTypes.STRING,
}, {
    freezeTableName: true, // Esto evitará que Sequelize pluralice el nombre de la tabla
    tableName: 'subcategoria',   // De manera opcional, puedes especificar el nombre exacto de la tabla
  });

