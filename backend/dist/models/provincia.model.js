"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provincia = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _canton = require("./canton.model");
var _direccion = require("./direccion.model");
var Provincia = exports.Provincia = _conexion.sequelize.define("provincia", {
  idProvincia: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: _sequelize.DataTypes.STRING
}, {
  freezeTableName: true,
  tableName: 'provincia'
});

//el 1
Provincia.hasMany(_canton.Canton, {
  foreignKey: 'idProvincia',
  sourceKey: 'idProvincia',
  as: 'canton'
});

//va al muchos
_canton.Canton.belongsTo(Provincia, {
  foreignKey: 'idProvincia',
  targetKey: 'idProvincia',
  as: 'provincia'
});

//el 1
Provincia.hasMany(_direccion.Direccion, {
  foreignKey: 'idProvincia',
  sourceKey: 'idProvincia',
  as: 'direccion'
});

//va al muchos
_direccion.Direccion.belongsTo(Provincia, {
  foreignKey: 'idProvincia',
  targetKey: 'idProvincia',
  as: 'provincia'
});