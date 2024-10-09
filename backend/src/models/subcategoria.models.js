import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Categoria } from "./categoria.models";



export const Subcategoria = sequelize.define("subcategoria", {
    idSubcategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre: DataTypes.STRING
});



