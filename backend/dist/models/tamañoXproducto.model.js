"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TamañoXProducto = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _producto = require("./producto.model");
var _tamaño = require("./tama\xF1o.model");
var TamañoXProducto = exports.TamañoXProducto = _conexion.sequelize.define("tamañoXProducto", {
  idProducto: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    // Define que forma parte de la clave primaria compuesta
    references: {
      model: _producto.Producto,
      key: "idProducto"
    }
  },
  idTamaño: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    // Define que forma parte de la clave primaria compuesta
    references: {
      model: _tamaño.Tamaño,
      key: "idTamaño"
    }
  }
}, {
  freezeTableName: true,
  tableName: "tamañoXProducto",
  timestamps: false
});

// Relaciones entre Producto y TamañoXProducto
_producto.Producto.hasMany(TamañoXProducto, {
  foreignKey: "idProducto",
  as: "tamaños"
});
TamañoXProducto.belongsTo(_producto.Producto, {
  foreignKey: "idProducto",
  as: "producto"
});

// Relaciones entre Tamaño y TamañoXProducto
_tamaño.Tamaño.hasMany(TamañoXProducto, {
  foreignKey: "idTamaño",
  as: "productos"
});
TamañoXProducto.belongsTo(_tamaño.Tamaño, {
  foreignKey: "idTamaño",
  as: "tamaño"
});