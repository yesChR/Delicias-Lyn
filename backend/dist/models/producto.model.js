"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Producto = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _categoria = require("./categoria.model");
var _subcategoria = require("./subcategoria.model");
var _detallePedido = require("./detallePedido.model");
// Importamos el modelo de Categoria
// Importamos el modelo de Subcategoria

var Producto = exports.Producto = _conexion.sequelize.define("producto", {
  idProducto: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idCategoria: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _categoria.Categoria,
      key: 'idCategoria'
    }
  },
  idSubcategoria: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _subcategoria.Subcategoria,
      key: 'idSubcategoria'
    }
  },
  nombre: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: false
  },
  descripcion: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: true
  },
  precio: {
    type: _sequelize.DataTypes.DOUBLE,
    allowNull: false
  },
  imagen: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: true
  },
  tipo: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,
  // Para evitar la pluralización automática
  tableName: 'producto' // Nombre exacto de la tabla
});

// Relación con Categoria
Producto.belongsTo(_categoria.Categoria, {
  foreignKey: 'idCategoria',
  // Relación con la categoría
  targetKey: 'idCategoria',
  as: 'categoria'
});

// Relación con Subcategoria
Producto.belongsTo(_subcategoria.Subcategoria, {
  foreignKey: 'idSubcategoria',
  // Relación con la subcategoría
  targetKey: 'idSubcategoria',
  as: 'subcategoria'
});

//el 1
Producto.hasMany(_detallePedido.DetallePedido, {
  foreignKey: 'idProducto',
  sourceKey: 'idProducto',
  as: 'detalle'
});

//va al muchos
_detallePedido.DetallePedido.belongsTo(Producto, {
  foreignKey: 'idProducto',
  targetKey: 'idProducto',
  as: 'producto'
});