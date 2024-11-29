"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pedido = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _detallePedido = require("./detallePedido.model");
var Pedido = exports.Pedido = _conexion.sequelize.define("pedido", {
  idPedido: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: _sequelize.DataTypes.STRING,
  apellidoUno: _sequelize.DataTypes.STRING,
  apellidoDos: _sequelize.DataTypes.STRING,
  correo: _sequelize.DataTypes.STRING,
  telefono: _sequelize.DataTypes.STRING,
  metodoEntrega: _sequelize.DataTypes.INTEGER,
  metodoPago: _sequelize.DataTypes.INTEGER,
  fechaEntrega: _sequelize.DataTypes.DATE,
  prioridad: _sequelize.DataTypes.INTEGER,
  montoTotal: _sequelize.DataTypes.DOUBLE
}, {
  freezeTableName: true,
  // Esto evitará que Sequelize pluralice el nombre de la tabla
  tableName: 'pedido' // De manera opcional, puedes especificar el nombre exacto de la tabla
});

//el 1
Pedido.hasMany(_detallePedido.DetallePedido, {
  foreignKey: 'idPedido',
  sourceKey: 'idPedido',
  as: 'detalle'
});

//va al muchos
_detallePedido.DetallePedido.belongsTo(Pedido, {
  foreignKey: 'idPedido',
  targetKey: 'idPedido',
  as: 'pedido'
});