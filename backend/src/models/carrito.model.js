import { DataTypes } from 'sequelize';
import { sequelize } from '../bd_config/conexion';
import { Usuario } from './usuario.model';
import { Producto } from './producto.model';

// Definir el modelo para la tabla relacional Carrito
export const Carrito = sequelize.define('carrito', {
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

/**
 * as: 'productosEnCarrito' -> Desde el controlador se utiliza, ya 
 * que posee los productos del carrito de ese usuario específico
 * 
 */

Producto.belongsToMany(Usuario, {
    through: Carrito,
    foreignKey: 'idProducto',
    otherKey: 'idUsuario',
    as: 'usuariosConCarrito' //
});

/**
 * as: 'usuariosConCarrito' -> Es una forma de decir: Los usuarios que tienen
 * en su carrito ese producto específico, de momento no es útil pero puede serlo después LOL.
 * 
 */


//Recordatorio: Aun falta tamañoxProducto que es parte del carrito