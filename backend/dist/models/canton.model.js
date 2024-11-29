"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Canton = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _distrito = require("./distrito.model");
var _direccion = require("./direccion.model");
var Canton = exports.Canton = _conexion.sequelize.define("canton", {
  idCanton: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: _sequelize.DataTypes.STRING
}, {
  freezeTableName: true,
  tableName: 'canton'
});

//el 1
Canton.hasMany(_distrito.Distrito, {
  foreignKey: 'idCanton',
  sourceKey: 'idCanton',
  as: 'distrito'
});

//va al muchos
_distrito.Distrito.belongsTo(Canton, {
  foreignKey: 'idCanton',
  targetKey: 'idCanton',
  as: 'canton'
});

//el 1
Canton.hasMany(_direccion.Direccion, {
  foreignKey: 'idCanton',
  sourceKey: 'idCanton',
  as: 'direccion'
});

//va al muchos
_direccion.Direccion.belongsTo(Canton, {
  foreignKey: 'idCanton',
  targetKey: 'idCanton',
  as: 'canton'
});