"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Categoria = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _subcategoria = require("./subcategoria.model");
var Categoria = exports.Categoria = _conexion.sequelize.define("categoria", {
  idCategoria: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: _sequelize.DataTypes.STRING
}, {
  freezeTableName: true,
  // Esto evitará que Sequelize pluralice el nombre de la tabla
  tableName: 'categoria' // De manera opcional, puedes especificar el nombre exacto de la tabla
});

//Relacionar modelo con subcategoria
//el 1...
Categoria.hasMany(_subcategoria.Subcategoria, {
  foreignKey: "idCategoria",
  // La columna en subcategoria que apunta a idCategoria(foranea)
  sourceKey: "idCategoria",
  // (campo al que referencia en este modelo)
  as: "subcategoria"
});

//va al muchos
_subcategoria.Subcategoria.belongsTo(Categoria, {
  foreignKey: "idCategoria",
  // La clave foránea en subcategoria
  targetKey: "idCategoria",
  // La clave primaria en categoria
  as: "categoria"
});