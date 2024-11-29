"use strict";

var _nodemailer = require("../controllers/nodemailer.controller");
var _require = require("express"),
  Router = _require.Router;
var nodemailer = Router();
nodemailer.post("/", _nodemailer.enviarCorreo);
module.exports = nodemailer;