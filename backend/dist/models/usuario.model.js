"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Usuario = void 0;
var _sequelize = require("sequelize");
var _conexion = require("../bd_config/conexion");
var _pedido = require("./pedido.model");
var Usuario = exports.Usuario = _conexion.sequelize.define("usuario", {
  idUsuario: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: _sequelize.DataTypes.STRING,
  apellidoUno: _sequelize.DataTypes.STRING,
  apellidoDos: _sequelize.DataTypes.STRING,
  correo: _sequelize.DataTypes.STRING,
  telefono: _sequelize.DataTypes.STRING,
  contraseña: _sequelize.DataTypes.STRING,
  rol: _sequelize.DataTypes.INTEGER,
  token: _sequelize.DataTypes.STRING
}, {
  tableName: 'usuario',
  // Especificar el nombre de la tabla aquí
  timestamps: false // Opcional: si no necesitas campos createdAt y updatedAt
});

//el 1
Usuario.hasMany(_pedido.Pedido, {
  foreignKey: 'idUsuario',
  sourceKey: 'idUsuario',
  as: 'pedidos'
});

//va al muchos
_pedido.Pedido.belongsTo(Usuario, {
  foreignKey: 'idUsuario',
  targetKey: 'idUsuario',
  as: 'usuario'
});