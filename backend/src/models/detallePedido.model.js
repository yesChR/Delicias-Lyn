import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";

export const DetallePedido = sequelize.define("detallePedido",{
    cantidad: DataTypes.INTEGER,
    montoXCantidad: DataTypes.DOUBLE
}, {
    freezeTableName: true, // Esto evitará que Sequelize pluralice el nombre de la tabla
    tableName: 'detallePedido',   // De manera opcional, puedes especificar el nombre exacto de la tabla
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