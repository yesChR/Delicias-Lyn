import { DataTypes } from 'sequelize';
import { sequelize } from '../bd_config/conexion';
import { Usuario } from './usuario.model';
import { Producto } from './producto.model';

// Definir el modelo para la tabla relacional Carrito
export const Carrito = sequelize.define('carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'idUsuario',
        }
    },
    idProducto: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto,
            key: 'idProducto',
        }
    },
    cantidad: DataTypes.INTEGER,
    montoXCantidad: DataTypes.DOUBLE, 
    personalizacion: DataTypes.STRING
}, {
    freezeTableName: true,
    tableName: 'carrito',
});

// Relación muchos a muchos entre Usuario y Producto a través de Carrito
Usuario.belongsToMany(Producto, {
    through: Carrito,
    foreignKey: 'idUsuario',
    otherKey: 'idProducto',
    as: 'productosEnCarrito' 
});



Producto.belongsToMany(Usuario, {
    through: Carrito,
    foreignKey: 'idProducto',
    otherKey: 'idUsuario',
    as: 'usuariosConCarrito' //
});
