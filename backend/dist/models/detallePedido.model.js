"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetallePedido = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var DetallePedido = exports.DetallePedido = _conexion.sequelize.define("detalleXPedido", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: _sequelize.DataTypes.INTEGER,
  montoXCantidad: _sequelize.DataTypes.DOUBLE,
  personalizacion: _sequelize.DataTypes.STRING
}, {
  freezeTableName: true,
  tableName: 'detallexpedido'
});