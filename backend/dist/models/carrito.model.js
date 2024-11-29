"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Carrito = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _usuario = require("./usuario.model");
var _producto = require("./producto.model");
// Definir el modelo para la tabla relacional Carrito
var Carrito = exports.Carrito = _conexion.sequelize.define('carrito', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idUsuario: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _usuario.Usuario,
      key: 'idUsuario'
    }
  },
  idProducto: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _producto.Producto,
      key: 'idProducto'
    }
  },
  cantidad: _sequelize.DataTypes.INTEGER,
  montoXCantidad: _sequelize.DataTypes.DOUBLE,
  personalizacion: _sequelize.DataTypes.STRING
}, {
  freezeTableName: true,
  tableName: 'carrito'
});

// Relación muchos a muchos entre Usuario y Producto a través de Carrito
_usuario.Usuario.belongsToMany(_producto.Producto, {
  through: Carrito,
  foreignKey: 'idUsuario',
  otherKey: 'idProducto',
  as: 'productosEnCarrito'
});
_producto.Producto.belongsToMany(_usuario.Usuario, {
  through: Carrito,
  foreignKey: 'idProducto',
  otherKey: 'idUsuario',
  as: 'usuariosConCarrito' //
});