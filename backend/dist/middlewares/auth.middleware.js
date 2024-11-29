"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validarToken = exports.limitarIntentos = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// middlewares/auth.middleware.js

// middlewares/auth.middleware.js

/**
 * Middleware para validar el token JWT y verificar si el usuario está autenticado.
 * Si el token es válido, extrae el ID de usuario (idUsuario) y el rol (rol) del token decodificado.
 * Este middleware protege las rutas que solo los usuarios autorizados pueden acceder.
 */

var validarToken = exports.validarToken = function validarToken(req, res, next) {
  var _req$headers$authoriz;
  var token = (_req$headers$authoriz = req.headers['authorization']) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[1]; // Suponiendo que el token se envía en el encabezado Authorization como "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      message: 'No se proporcionó token de autenticación.'
    });
  }
  _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).json({
        message: 'Token no válido.'
      });
    }
    req.idUsuario = decoded.id; // Guardamos el id del usuario en el objeto de la solicitud
    req.userRole = decoded.rol; // Guardamos el rol del usuario en el objeto de la solicitud
    next();
  });
};
var limitarIntentos = exports.limitarIntentos = (0, _expressRateLimit["default"])({
  windowMs: 5 * 60 * 1000,
  // 5 minutos (corrige el comentario de 15 minutos)
  max: 5,
  // Límite de 5 solicitudes por IP
  message: 'Demasiados intentos, por favor intente de nuevo más tarde.'
});