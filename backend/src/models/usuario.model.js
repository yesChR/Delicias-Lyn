import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";


export const Usuario = sequelize.define("usuario", {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: DataTypes.STRING,
    apellidoUno: DataTypes.STRING,
    apellidoDos: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    rol: DataTypes.INTEGER,
    token: DataTypes.STRING
}, {
    tableName: 'usuario', // Especificar el nombre de la tabla aquí
    timestamps: false // Opcional: si no necesitas campos createdAt y updatedAt
});


