"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Distrito = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _direccion = require("./direccion.model");
var Distrito = exports.Distrito = _conexion.sequelize.define("distrito", {
  idDistrito: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: _sequelize.DataTypes.STRING
}, {
  freezeTableName: true,
  tableName: 'distrito'
});

//el 1
Distrito.hasMany(_direccion.Direccion, {
  foreignKey: 'idDistrito',
  sourceKey: 'idDistrito',
  as: 'direccion'
});

//va al muchos
_direccion.Direccion.belongsTo(Distrito, {
  foreignKey: 'idDistrito',
  targetKey: 'idDistrito',
  as: 'distrito'
});