"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Direccion = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _pedido = require("./pedido.model");
var Direccion = exports.Direccion = _conexion.sequelize.define("direccion", {
  idDireccion: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  direccionExacta: _sequelize.DataTypes.STRING
}, {
  freezeTableName: true,
  tableName: 'direccion'
});

//el 1
Direccion.hasMany(_pedido.Pedido, {
  foreignKey: 'idDireccion',
  sourceKey: 'idDireccion',
  as: 'pedidos'
});

//va al muchos
_pedido.Pedido.belongsTo(Direccion, {
  foreignKey: 'idDireccion',
  targetKey: 'idDireccion',
  as: 'direccion'
});