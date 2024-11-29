"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;
var _config = _interopRequireDefault(require("../config/config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _require = require('sequelize'),
  Sequelize = _require.Sequelize;
var sequelize = exports.sequelize = new Sequelize(_config["default"].database, _config["default"].username, _config["default"].dbpass, {
  host: _config["default"].dbhost,
  port: _config["default"].dbport,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});