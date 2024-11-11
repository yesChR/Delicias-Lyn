import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Usuario } from "./usuario.models";
import { Producto } from "./producto.models";

export const Carrito = sequelize.define("carrito", {
    idUsuario: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: "idUsuario",
      },
    },
    idProducto: {
      type: DataTypes.INTEGER,
      references: {
        model: Producto,
        key: "idProducto",
      },
    },
    cantidad: DataTypes.INTEGER,
    montoXCantidad: DataTypes.DOUBLE,
  });
  
  // Relación muchos a muchos
  Usuario.belongsToMany(Producto, {
    through: Carrito,
    foreignKey: "idUsuario",
    otherKey: "idProducto",
    as: "productosEnCarrito"
  });
  
  Producto.belongsToMany(Usuario, {
    through: Carrito,
    foreignKey: "idProducto",
    otherKey: "idUsuario",
    as: "usuariosConCarrito"
  });