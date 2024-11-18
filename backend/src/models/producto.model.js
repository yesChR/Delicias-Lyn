import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Categoria } from "./categoria.model";  // Importamos el modelo de Categoria
import { Subcategoria } from "./subcategoria.model";  // Importamos el modelo de Subcategoria
import { DetallePedido } from "./detallePedido.model";

export const Producto = sequelize.define("producto", {
    idProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria,
            key: 'idCategoria'
        }
    },
    idSubcategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: Subcategoria,
            key: 'idSubcategoria'
        }
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true,  // Para evitar la pluralización automática
    tableName: 'producto',  // Nombre exacto de la tabla
});

// Relación con Categoria
Producto.belongsTo(Categoria, {
    foreignKey: 'idCategoria', // Relación con la categoría
    targetKey: 'idCategoria',
    as: 'categoria'
});

// Relación con Subcategoria
Producto.belongsTo(Subcategoria, {
    foreignKey: 'idSubcategoria', // Relación con la subcategoría
    targetKey: 'idSubcategoria',
    as: 'subcategoria'
});

//el 1
Producto.hasMany(DetallePedido, {
    foreignKey: 'idProducto',
    sourceKey: 'idProducto',
    as: 'detalle'
});

//va al muchos
DetallePedido.belongsTo(Producto, {
    foreignKey: 'idProducto',
    targetKey: 'idProducto',
    as: 'producto'
});


