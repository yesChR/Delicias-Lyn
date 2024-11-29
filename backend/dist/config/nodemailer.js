"use strict";

var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _config = _interopRequireDefault(require("./config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var transporter = _nodemailer["default"].createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: _config["default"].email,
    pass: _config["default"].pass
  }
});
transporter.verify().then(function () {
  return console.log("Conectado exitosamente");
})["catch"](function (error) {
  return console.error(error);
});
module.exports = transporter;