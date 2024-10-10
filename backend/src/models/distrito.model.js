import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";

export const Distrito = sequelize.define("distrito", {
    idDistrito: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement:true
    },
    nombre: DataTypes.STRING,
});

