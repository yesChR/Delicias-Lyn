import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Producto } from "./producto.model";
import { Tamaño } from "./tamaño.model";

export const TamañoXProducto = sequelize.define("tamañoxproducto", {
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Define que forma parte de la clave primaria compuesta
        references: {
            model: Producto,
            key: "idProducto"
        }
    },
    idTamaño: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Define que forma parte de la clave primaria compuesta
        references: {
            model: Tamaño,
            key: "idTamaño"
        }
    },
}, {
    freezeTableName: true,
    tableName: "tamañoxproducto",
    timestamps: false
});

// Relaciones entre Producto y TamañoXProducto
Producto.hasMany(TamañoXProducto, {
    foreignKey: "idProducto",
    as: "tamaños"
});
TamañoXProducto.belongsTo(Producto, {
    foreignKey: "idProducto",
    as: "producto"
});

// Relaciones entre Tamaño y TamañoXProducto
Tamaño.hasMany(TamañoXProducto, {
    foreignKey: "idTamaño",
    as: "productos"
});
TamañoXProducto.belongsTo(Tamaño, {
    foreignKey: "idTamaño",
    as: "tamaño"
});
