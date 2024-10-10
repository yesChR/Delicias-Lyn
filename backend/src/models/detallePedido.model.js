import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";

export const DetallePedido = sequelize.define("detallePedido",{
    cantidad: DataTypes.INTEGER,
    montoXCantidad: DataTypes.DOUBLE
});


//Relación muchos a muchos
/*
Pedido.belongsToMany(Producto, {
    through: DetallePedido,
    foreignKey: 'pedidoId',
    //otherKey: 'productoId'
});

Producto.belongsToMany(Pedido, {
    through: DetallePedido,
    foreignKey: 'productoId',
    otherKey: 'pedidoId'
});
*/