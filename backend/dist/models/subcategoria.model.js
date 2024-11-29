"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subcategoria = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _categoria = require("./categoria.model");
// models/subcategoria.models.js

// Asegúrate de que la ruta sea correcta

var Subcategoria = exports.Subcategoria = _conexion.sequelize.define("subcategoria", {
  idSubcategoria: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: _sequelize.DataTypes.STRING
}, {
  freezeTableName: true,
  tableName: 'subcategoria'
});