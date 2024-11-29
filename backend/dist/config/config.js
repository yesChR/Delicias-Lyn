"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var _default = exports["default"] = {
  port: process.env.PORT || '',
  email: process.env.EMAIL || '',
  pass: process.env.PASS || '',
  database: process.env.DATABASE || '',
  username: process.env.DB_USER_NAME || '',
  dbpass: process.env.DB_PASS || '',
  dbport: process.env.DB_PORT || '',
  dbhost: process.env.DB_HOST || '',
  authjwtsecret: process.env.DB_HOST || ''
};