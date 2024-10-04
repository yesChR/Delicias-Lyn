import { DataTypes } from "sequelize";
import { sequelize } from "../bd/conexion";

export const Categoria = sequelize.define("categoria", {
    idCategoria: {
       Type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement:true
    },
    nombre: DataTypes.STRING
});


