"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tamaño = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _detallePedido = require("./detallePedido.model");
var _carrito = require("./carrito.model");
var Tamaño = exports.Tamaño = _conexion.sequelize.define("tamaño", {
  idTamaño: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: _sequelize.DataTypes.STRING
}, {
  freezeTableName: true,
  tableName: 'tamaño'
});

//el 1
Tamaño.hasMany(_detallePedido.DetallePedido, {
  foreignKey: 'idTamaño',
  sourceKey: 'idTamaño',
  as: 'detalle'
});

//va al muchos
_detallePedido.DetallePedido.belongsTo(Tamaño, {
  foreignKey: 'idTamaño',
  targetKey: 'idTamaño',
  as: 'tamaño'
});
Tamaño.hasMany(_carrito.Carrito, {
  foreignKey: 'idTamaño',
  sourceKey: 'idTamaño',
  as: 'carrito'
});

//va al muchos
_carrito.Carrito.belongsTo(Tamaño, {
  foreignKey: 'idTamaño',
  targetKey: 'idTamaño',
  as: 'tamaño'
});