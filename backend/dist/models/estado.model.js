"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Estado = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _pedido = require("./pedido.model");
var Estado = exports.Estado = _conexion.sequelize.define("estado", {
  idEstado: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: _sequelize.DataTypes.STRING
}, {
  freezeTableName: true,
  tableName: 'estado'
});

//el 1
Estado.hasMany(_pedido.Pedido, {
  foreignKey: 'idEstado',
  sourceKey: 'idEstado',
  as: 'pedidos'
});

//va al muchos
_pedido.Pedido.belongsTo(Estado, {
  foreignKey: 'idEstado',
  targetKey: 'idEstado',
  as: 'estado'
});