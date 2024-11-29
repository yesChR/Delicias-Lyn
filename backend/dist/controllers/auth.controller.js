"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validarCredencial = exports.solicitarRecuperacion = exports.resetearContraseña = exports.registrar = exports.iniciarSesion = exports.cerrarSesion = exports.cambiarContraseña = void 0;
var _usuario = require("../models/usuario.model");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config/config"));
var _nodemailer = _interopRequireDefault(require("../config/nodemailer"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // Importar bcrypt correctamente
// Si estás usando ES6 modules
/**
 * Funciones:
 * registro, inicio sesion, cierre sesion, cambio contraseña y reseteo
 */

/**
 * Registrar usuario 
 * El rol del usuario es 1 y esta predefinido (Podemos cambiarlo por si acaso). 
 * El campo token no se genera, pero se guarda como default_token
 * 
 */

var registrar = exports.registrar = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, nombre, apellidoUno, apellidoDos, correo, contraseña, telefono, existeUsuario, contraseñaCifrada, nuevoUsuario;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, nombre = _req$body.nombre, apellidoUno = _req$body.apellidoUno, apellidoDos = _req$body.apellidoDos, correo = _req$body.correo, contraseña = _req$body.contraseña, telefono = _req$body.telefono;
          _context.prev = 1;
          if (correo) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'El campo correo es obligatorio.'
          }));
        case 4:
          if (contraseña) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'El campo contraseña es obligatorio.'
          }));
        case 6:
          _context.next = 8;
          return _usuario.Usuario.findOne({
            where: {
              correo: correo
            }
          });
        case 8:
          existeUsuario = _context.sent;
          if (!existeUsuario) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Ya existe un usuario con el correo: ".concat(correo)
          }));
        case 11:
          _context.next = 13;
          return _bcrypt["default"].hash(contraseña, 10);
        case 13:
          contraseñaCifrada = _context.sent;
          _context.next = 16;
          return _usuario.Usuario.create({
            nombre: nombre,
            apellidoUno: apellidoUno,
            apellidoDos: apellidoDos,
            correo: correo,
            telefono: telefono,
            contraseña: contraseñaCifrada,
            rol: 1,
            token: 'token_default' // Puedes usar un valor predeterminado o null
          });
        case 16:
          nuevoUsuario = _context.sent;
          res.status(201).json({
            message: 'Usuario registrado exitosamente.',
            usuario: nuevoUsuario
          });
          _context.next = 24;
          break;
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Ocurrió un error al registrar el usuario.',
            error: _context.t0.message
          });
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 20]]);
  }));
  return function registrar(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Inicia la sesion, genera un token de sesión que se guarda
 * en la tabla de usuarios.
 * Este token esta firmado por una clave secreta que esta en el .ENV
 * El tiempo de expiración o validez del token es de 1 hora (3600s)
 * 
 
 */

var iniciarSesion = exports.iniciarSesion = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, correo, contraseña, usuario, contraseñaValida, token;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, correo = _req$body2.correo, contraseña = _req$body2.contraseña;
          if (!(!correo || !contraseña)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Correo y contraseña son requeridos'
          }));
        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return _usuario.Usuario.findOne({
            where: {
              correo: correo
            }
          });
        case 6:
          usuario = _context2.sent;
          if (usuario) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Usuario no encontrado'
          }));
        case 9:
          _context2.next = 11;
          return _bcrypt["default"].compare(contraseña, usuario.contraseña);
        case 11:
          contraseñaValida = _context2.sent;
          if (contraseñaValida) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Contraseña incorrecta'
          }));
        case 14:
          if (_config["default"].authjwtsecret) {
            _context2.next = 16;
            break;
          }
          return _context2.abrupt("return", res.status(500).json({
            message: 'Error del servidor: La clave no está configurado.'
          }));
        case 16:
          token = _jsonwebtoken["default"].sign({
            id: usuario.idUsuario,
            rol: usuario.rol
          }, process.env.JWT_SECRET, {
            expiresIn: '3600s'
          });
          _context2.next = 19;
          return _usuario.Usuario.update({
            token: token
          }, {
            where: {
              idUsuario: usuario.idUsuario
            }
          });
        case 19:
          res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token: token,
            user: {
              nombre: usuario.nombre,
              rol: usuario.rol,
              apellido1: usuario.apellidoUno,
              apellido2: usuario.apellidoDos,
              email: usuario.correo,
              tel: usuario.telefono
            }
          });
          _context2.next = 26;
          break;
        case 22:
          _context2.prev = 22;
          _context2.t0 = _context2["catch"](3);
          console.error('Error en iniciar sesión:', _context2.t0);
          res.status(500).json({
            message: 'Error en el servidor'
          });
        case 26:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 22]]);
  }));
  return function iniciarSesion(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Elimina el token de la base de datos y lo pone en null
 */

var cerrarSesion = exports.cerrarSesion = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var token, usuario;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          token = req.body.token; // Asume que el token se envía en la solicitud
          _context3.prev = 1;
          _context3.next = 4;
          return _usuario.Usuario.findOne({
            where: {
              token: token
            }
          });
        case 4:
          usuario = _context3.sent;
          if (usuario) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Token no válido o ya cerrado sesión.'
          }));
        case 7:
          _context3.next = 9;
          return _usuario.Usuario.update({
            token: null
          }, {
            where: {
              idUsuario: usuario.idUsuario
            }
          });
        case 9:
          res.status(200).json({
            message: 'Sesión cerrada exitosamente.'
          });
          _context3.next = 16;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Ocurrió un error al cerrar sesión.'
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return function cerrarSesion(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * El req.idUsuario se obtiene del middleware de validar token y a la vez este decodifica el token
 * 
 */
var cambiarContraseña = exports.cambiarContraseña = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body3, contraseñaActual, contraseñaNueva, usuario, contrasenaValida, contraseñaNuevaCifrada;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, contraseñaActual = _req$body3.contraseñaActual, contraseñaNueva = _req$body3.contraseñaNueva; // Validar la entrada
          if (!(!contraseñaActual || !contraseñaNueva)) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Todos los campos son requeridos'
          }));
        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return _usuario.Usuario.findOne({
            where: {
              idUsuario: req.idUsuario
            }
          });
        case 6:
          usuario = _context4.sent;
          _context4.next = 9;
          return _bcrypt["default"].compare(contraseñaActual, usuario.contraseña);
        case 9:
          contrasenaValida = _context4.sent;
          if (contrasenaValida) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Contraseña actual incorrecta del usuario'
          }));
        case 12:
          _context4.next = 14;
          return _bcrypt["default"].hash(contraseñaNueva, 10);
        case 14:
          contraseñaNuevaCifrada = _context4.sent;
          _context4.next = 17;
          return _usuario.Usuario.update({
            contraseña: contraseñaNuevaCifrada
          }, {
            where: {
              idUsuario: usuario.idUsuario
            }
          });
        case 17:
          res.status(200).json({
            message: 'Contraseña cambiada exitosamente'
          });
          _context4.next = 24;
          break;
        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](3);
          console.error('Error al cambiar la contraseña:', _context4.t0);
          res.status(500).json({
            message: 'Error en el servidor'
          });
        case 24:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 20]]);
  }));
  return function cambiarContraseña(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var solicitarRecuperacion = exports.solicitarRecuperacion = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var correo, usuario, codigoVerificacion, expiracion, formato;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          correo = req.body.correo;
          _context5.prev = 1;
          _context5.next = 4;
          return _usuario.Usuario.findOne({
            where: {
              correo: correo
            }
          });
        case 4:
          usuario = _context5.sent;
          if (usuario) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado.'
          }));
        case 7:
          // Generar un código de recuperación aleatorio
          codigoVerificacion = _crypto["default"].randomInt(100000, 999999).toString(); // Expiración del código en 10 minutos (600000 ms)
          expiracion = Date.now() + 5 * 60000; // 5 minutos
          // Guardar el código y la expiración en el token
          _context5.next = 11;
          return _usuario.Usuario.update({
            token: "".concat(codigoVerificacion, "-").concat(expiracion)
          },
          // Código y expiración concatenados
          {
            where: {
              idUsuario: usuario.idUsuario
            }
          });
        case 11:
          formato = {
            from: _config["default"].email,
            to: correo,
            subject: 'DeliciasLyn - Recuperación de contraseña',
            html: "\n                <p style=\"color: rgb(249,0,124); font-weight: bold;\">DeliciasLyn</p>\n                <p>Hola, tu c\xF3digo de recuperaci\xF3n es:</p>\n                <h2 style=\"font-size: 24px; font-weight: bold;\">".concat(codigoVerificacion, "</h2>\n                <p>Este c\xF3digo expirar\xE1 en <strong>cinco minutos</strong>, por lo que te recomendamos ingresarlo lo antes posible.</p>\n                <p>Si no solicitaste este cambio, por favor ignora este correo.</p>\n            ")
          };
          _context5.next = 14;
          return _nodemailer["default"].sendMail(formato);
        case 14:
          res.status(200).json({
            message: 'Correo de recuperación enviado. Verifica tu bandeja de entrada.'
          });
          _context5.next = 21;
          break;
        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](1);
          console.error('Error al solicitar la recuperación:', _context5.t0);
          res.status(500).json({
            message: 'Error en el servidor',
            error: _context5.t0.message
          });
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 17]]);
  }));
  return function solicitarRecuperacion(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var resetearContraseña = exports.resetearContraseña = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body4, correo, codigoIngresado, nuevaContraseña, usuario, _usuario$token$split, _usuario$token$split2, codigo, expiracion, contraseñaCifrada, mailOptions;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body4 = req.body, correo = _req$body4.correo, codigoIngresado = _req$body4.codigoIngresado, nuevaContraseña = _req$body4.nuevaContraseña;
          _context6.prev = 1;
          if (!(!correo || !codigoIngresado || !nuevaContraseña)) {
            _context6.next = 4;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'El correo, código y la nueva contraseña son requeridos'
          }));
        case 4:
          _context6.next = 6;
          return _usuario.Usuario.findOne({
            where: {
              correo: correo
            }
          });
        case 6:
          usuario = _context6.sent;
          if (usuario) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Correo no encontrado'
          }));
        case 9:
          if (!(usuario.token === null)) {
            _context6.next = 11;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Código de verificación no válido'
          }));
        case 11:
          // Verificar si el código coincide con el token almacenado en la base de datos
          _usuario$token$split = usuario.token.split('-'), _usuario$token$split2 = _slicedToArray(_usuario$token$split, 2), codigo = _usuario$token$split2[0], expiracion = _usuario$token$split2[1];
          if (!(codigo !== codigoIngresado)) {
            _context6.next = 14;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Código de verificación no válido'
          }));
        case 14:
          if (!(Date.now() > Number(expiracion))) {
            _context6.next = 16;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'El código ha expirado'
          }));
        case 16:
          if (!(nuevaContraseña.length < 8)) {
            _context6.next = 18;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'La nueva contraseña debe tener al menos 8 caracteres'
          }));
        case 18:
          _context6.next = 20;
          return _bcrypt["default"].hash(nuevaContraseña, 10);
        case 20:
          contraseñaCifrada = _context6.sent;
          _context6.next = 23;
          return _usuario.Usuario.update({
            contraseña: contraseñaCifrada,
            token: 'token_default' // Marcar el token como expirado
          }, {
            where: {
              idUsuario: usuario.idUsuario
            }
          });
        case 23:
          mailOptions = {
            from: _config["default"].email,
            to: correo,
            subject: 'Contraseña restablecida exitosamente',
            text: 'Tu contraseña ha sido restablecida correctamente.',
            html: '<p>Tu contraseña ha sido restablecida exitosamente.</p>'
          }; // Enviar el correo
          _context6.next = 26;
          return _nodemailer["default"].sendMail(mailOptions);
        case 26:
          res.status(200).json({
            message: 'Contraseña restablecida exitosamente.'
          });
          _context6.next = 33;
          break;
        case 29:
          _context6.prev = 29;
          _context6.t0 = _context6["catch"](1);
          console.error('Error al restablecer la contraseña:', _context6.t0);
          res.status(500).json({
            message: 'Error en el servidor'
          });
        case 33:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 29]]);
  }));
  return function resetearContraseña(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var validarCredencial = exports.validarCredencial = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body5, correo, token, codigoIngresado, tipo, usuario, _usuario$token$split3, _usuario$token$split4, codigo, expiracion;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$body5 = req.body, correo = _req$body5.correo, token = _req$body5.token, codigoIngresado = _req$body5.codigoIngresado;
          tipo = req.params.tipo;
          _context7.prev = 2;
          if (!(!correo || !(token || codigoIngresado))) {
            _context7.next = 5;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'Correo, token o código son requeridos'
          }));
        case 5:
          _context7.next = 7;
          return _usuario.Usuario.findOne({
            where: {
              correo: correo
            }
          });
        case 7:
          usuario = _context7.sent;
          if (usuario) {
            _context7.next = 10;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'Correo no encontrado'
          }));
        case 10:
          if (!(tipo === 'token')) {
            _context7.next = 16;
            break;
          }
          if (!(usuario.token !== token)) {
            _context7.next = 13;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'Token no válido'
          }));
        case 13:
          return _context7.abrupt("return", res.status(200).json({
            message: 'Token válido. Puedes proceder con la acción correspondiente.'
          }));
        case 16:
          if (!(tipo === 'codigo')) {
            _context7.next = 27;
            break;
          }
          if (!(!usuario.token || usuario.token === 'token_default')) {
            _context7.next = 19;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'No se ha solicitado un código de recuperación o el token es inválido'
          }));
        case 19:
          // Extraer el código y la expiración del token almacenado
          _usuario$token$split3 = usuario.token.split('-'), _usuario$token$split4 = _slicedToArray(_usuario$token$split3, 2), codigo = _usuario$token$split4[0], expiracion = _usuario$token$split4[1];
          if (!(codigo !== codigoIngresado)) {
            _context7.next = 22;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'Código de verificación no válido'
          }));
        case 22:
          if (!(Date.now() > Number(expiracion))) {
            _context7.next = 24;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'El código ha expirado'
          }));
        case 24:
          return _context7.abrupt("return", res.status(200).json({
            message: 'Código válido. Puedes proceder a restablecer tu contraseña.'
          }));
        case 27:
          return _context7.abrupt("return", res.status(400).json({
            message: 'Tipo de validación no reconocido'
          }));
        case 28:
          _context7.next = 34;
          break;
        case 30:
          _context7.prev = 30;
          _context7.t0 = _context7["catch"](2);
          console.error('Error al validar token o código:', _context7.t0);
          res.status(500).json({
            message: 'Error en el servidor'
          });
        case 34:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[2, 30]]);
  }));
  return function validarCredencial(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();