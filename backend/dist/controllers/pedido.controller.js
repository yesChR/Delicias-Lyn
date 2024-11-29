"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visualizarPedidos = exports.filtrarPorUsuario = exports.filtrarPorId = exports.filtrarPorEstado = exports.editarPrioridad = exports.editarEstado = exports.crearPedido = void 0;
var _estado = require("../models/estado.model");
var _direccion = require("../models/direccion.model");
var _carrito = require("../models/carrito.model");
var _pedido = require("../models/pedido.model");
var _canton = require("../models/canton.model");
var _distrito = require("../models/distrito.model");
var _provincia = require("../models/provincia.model");
var _detallePedido = require("../models/detallePedido.model");
var _producto = require("../models/producto.model");
var _categoria = require("../models/categoria.model");
var _subcategoria = require("../models/subcategoria.model");
var _tamaño = require("../models/tama\xF1o.model");
var _conexion = require("../bd_config/conexion");
var _nodemailer = _interopRequireDefault(require("../config/nodemailer"));
var _config = _interopRequireDefault(require("../config/config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var crearPedido = exports.crearPedido = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, idUsuario, idEstado, idCanton, idDistrito, idProvincia, direccionExacta, nombre, apellidoUno, apellidoDos, correo, telefono, metodoEntrega, metodoPago, fechaEntrega, prioridad, montoTotal, t, estado, datosCarrito, direccionCliente, lastInsertedId, nuevoPedido, detalle, correoAdmin, correoCliente;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, idUsuario = _req$body.idUsuario, idEstado = _req$body.idEstado, idCanton = _req$body.idCanton, idDistrito = _req$body.idDistrito, idProvincia = _req$body.idProvincia, direccionExacta = _req$body.direccionExacta, nombre = _req$body.nombre, apellidoUno = _req$body.apellidoUno, apellidoDos = _req$body.apellidoDos, correo = _req$body.correo, telefono = _req$body.telefono, metodoEntrega = _req$body.metodoEntrega, metodoPago = _req$body.metodoPago, fechaEntrega = _req$body.fechaEntrega, prioridad = _req$body.prioridad, montoTotal = _req$body.montoTotal;
          _context.next = 3;
          return _conexion.sequelize.transaction();
        case 3:
          t = _context.sent;
          _context.prev = 4;
          _context.next = 7;
          return _estado.Estado.findOne({
            where: {
              idEstado: idEstado
            }
          });
        case 7:
          estado = _context.sent;
          _context.next = 10;
          return _carrito.Carrito.findAll({
            where: {
              idUsuario: idUsuario
            }
          });
        case 10:
          datosCarrito = _context.sent;
          console.log("Datos Carrito", datosCarrito);
          if (!(datosCarrito.length > 0)) {
            _context.next = 37;
            break;
          }
          _context.next = 15;
          return _direccion.Direccion.create({
            idCanton: idCanton,
            idDistrito: idDistrito,
            idProvincia: idProvincia,
            direccionExacta: direccionExacta
          }, {
            transaction: t
          });
        case 15:
          direccionCliente = _context.sent;
          lastInsertedId = direccionCliente.idDireccion; // Crear el pedido dentro de la transacción
          _context.next = 19;
          return _pedido.Pedido.create({
            idUsuario: idUsuario,
            idEstado: estado.idEstado,
            idDireccion: lastInsertedId,
            nombre: nombre,
            apellidoUno: apellidoUno,
            apellidoDos: apellidoDos,
            correo: correo,
            telefono: telefono,
            metodoEntrega: metodoEntrega,
            metodoPago: metodoPago,
            fechaEntrega: fechaEntrega,
            prioridad: prioridad,
            montoTotal: montoTotal
          }, {
            transaction: t
          });
        case 19:
          nuevoPedido = _context.sent;
          // Crear el detalle del pedido
          detalle = datosCarrito.map(function (item) {
            var datos = item.toJSON();
            return {
              idProducto: datos.idProducto,
              idPedido: nuevoPedido.idPedido,
              idTamaño: datos.idTamaño,
              cantidad: datos.cantidad,
              montoXCantidad: datos.montoXCantidad,
              personalizacion: datos.personalizacion
            };
          });
          console.log(detalle);

          // Insertar los detalles del pedido en la base de datos
          _context.next = 24;
          return _detallePedido.DetallePedido.bulkCreate(detalle, {
            transaction: t
          });
        case 24:
          _context.next = 26;
          return _carrito.Carrito.destroy({
            where: {
              idUsuario: idUsuario
            },
            transaction: t
          });
        case 26:
          //se envia correo para Admin
          correoAdmin = {
            from: _config["default"].email,
            to: _config["default"].email,
            subject: 'Delicias Lyn - Nuevo Pedido',
            html: "\n                    <div style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px; width: 100%; max-width: 600px; margin: auto;\">\n                        <h2 style=\"color: #333; text-align: center; font-size: 24px;\">Nuevo Pedido Recibido</h2>\n                        <p style=\"font-size: 16px; color: #333;\">Hola Arlyn,</p>\n                        <p style=\"font-size: 16px; color: #333;\">Tienes un nuevo pedido en tu lista. Por favor, revisa los detalles a continuaci\xF3n:</p>\n                        <div style=\"background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;\">\n                            <p style=\"font-size: 16px; color: #333;\">\xA1Gracias por tu gesti\xF3n!</p>\n                        </div>\n                        <p style=\"font-size: 14px; color: #777; text-align: center;\">Este correo es generado autom\xE1ticamente. No respondas a este mensaje.</p>\n                    </div>\n                "
          }; //se envia correo para cliente
          correoCliente = {
            from: _config["default"].email,
            to: correo,
            subject: 'Delicias Lyn - Pedido Confirmado',
            html: "\n                    <div style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px; width: 100%; max-width: 600px; margin: auto;\">\n                        <h2 style=\"color: #333; text-align: center; font-size: 24px;\">\xA1Tu Pedido ha sido Registrado Exitosamente!</h2>\n                        <p style=\"font-size: 16px; color: #333;\">Hola ".concat(nombre, ",</p>\n                        <p style=\"font-size: 16px; color: #333;\">\xA1Gracias por confiar en Delicias Lyn! Hemos recibido tu pedido con el n\xFAmero de referencia <strong>").concat(nuevoPedido.idPedido, "</strong>.</p>\n                        <div style=\"background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;\">\n                            <p style=\"font-size: 16px; color: #333;\">A continuaci\xF3n, se detallan los datos de tu pedido:</p>\n                            <ul style=\"font-size: 16px; color: #333; list-style: none; padding-left: 0;\">\n                                <li><strong>Nombre:</strong> ").concat(nombre, " ").concat(apellidoUno, " ").concat(apellidoDos, "</li>\n                                <li><strong>Correo:</strong> ").concat(correo, "</li>\n                                <li><strong>Tel\xE9fono:</strong> ").concat(telefono, "</li>\n                                <li><strong>Fecha de Entrega:</strong> ").concat(fechaEntrega, "</li>\n                                <li><strong>Monto Total:</strong> \u20A1").concat(montoTotal, "</li>\n                            </ul>\n                            <p style=\"font-size: 16px; color: #333;\">Te contactaremos pronto con m\xE1s detalles sobre el estado de tu pedido.</p>\n                        </div>\n                        <p style=\"font-size: 14px; color: #777; text-align: center;\">Este correo es generado autom\xE1ticamente. No respondas a este mensaje.</p>\n                    </div>\n                ")
          };
          _context.next = 30;
          return _nodemailer["default"].sendMail(correoAdmin);
        case 30:
          _context.next = 32;
          return _nodemailer["default"].sendMail(correoCliente);
        case 32:
          _context.next = 34;
          return t.commit();
        case 34:
          res.status(201).json({
            message: "Pedido creado exitosamente"
          });
          _context.next = 38;
          break;
        case 37:
          res.status(409).json({
            error: "No se pudo crear el pedido. Verifique el carrito."
          });
        case 38:
          _context.next = 46;
          break;
        case 40:
          _context.prev = 40;
          _context.t0 = _context["catch"](4);
          console.error("Error al crear el pedido:", _context.t0);
          _context.next = 45;
          return t.rollback();
        case 45:
          res.status(500).json({
            error: "Error interno en el servidor"
          });
        case 46:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 40]]);
  }));
  return function crearPedido(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var visualizarPedidos = exports.visualizarPedidos = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var pedidos;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _pedido.Pedido.findAll({
            include: [{
              model: _estado.Estado,
              as: "estado",
              attributes: ["idEstado", "nombre"]
            }, {
              model: _direccion.Direccion,
              as: "direccion",
              attributes: ["idDireccion", "direccionExacta"],
              include: [{
                model: _provincia.Provincia,
                as: "provincia",
                attributes: ['nombre']
              }, {
                model: _canton.Canton,
                as: "canton",
                attributes: ['nombre']
              }, {
                model: _distrito.Distrito,
                as: "distrito",
                attributes: ['nombre']
              }]
            }, {
              model: _detallePedido.DetallePedido,
              as: "detalle",
              attributes: ["idPedido", "idProducto", "cantidad", "montoXCantidad", "personalizacion"],
              include: [{
                model: _producto.Producto,
                as: "producto",
                attributes: ['nombre', 'precio', 'descripcion', 'tipo', 'estado'],
                include: [{
                  model: _categoria.Categoria,
                  as: "categoria",
                  attributes: ['idCategoria', 'nombre']
                }, {
                  model: _subcategoria.Subcategoria,
                  as: "subcategoria",
                  attributes: ['idSubcategoria', 'nombre']
                }]
              }, {
                model: _tamaño.Tamaño,
                as: "tamaño",
                attributes: ['idTamaño', 'nombre']
              }]
            }],
            // Ordenar primero por prioridad (de forma descendente) y luego por fechaEntrega (también descendente)
            order: [['prioridad', 'DESC'] // Ordena por prioridad en orden descendente
            // Ordena por fechaEntrega en orden descendente
            ]
          });
        case 3:
          pedidos = _context2.sent;
          res.status(200).json(pedidos);
          _context2.next = 11;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            error: "Error interno del servidor"
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function visualizarPedidos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var generarMensajeEstado = function generarMensajeEstado(idEstado, pedido) {
  console.log("mensajeestado", idEstado, pedido);
  var mensajeCorreo = '';
  var montoTotal = pedido.montoTotal;
  var anticipo = montoTotal * 0.5;

  // Estilos básicos en línea
  var estiloGeneral = "\n        <style>\n            body {\n                font-family: Arial, sans-serif;\n                color: #333;\n                line-height: 1.6;\n            }\n            .container {\n                max-width: 600px;\n                margin: 0 auto;\n                padding: 20px;\n                background-color: #f9f9f9;\n                border-radius: 10px;\n                border: 1px solid #ddd;\n            }\n            h2 {\n                color: #2c3e50;\n            }\n            p {\n                font-size: 16px;\n            }\n            strong {\n                color: #e74c3c;\n            }\n            .highlight {\n                font-weight: bold;\n                color: #3498db;\n            }\n            .invoice-table {\n                width: 100%;\n                border-collapse: collapse;\n                margin-top: 20px;\n            }\n            .invoice-table th, .invoice-table td {\n                border: 1px solid #ddd;\n                padding: 8px;\n                text-align: left;\n            }\n            .invoice-table th {\n                background-color: #2c3e50;\n                color: white;\n            }\n            .footer {\n                margin-top: 30px;\n                font-size: 14px;\n                text-align: center;\n                color: #7f8c8d;\n            }\n        </style>\n    ";
  switch (idEstado) {
    case '1':
      // Pendiente de revisión
      mensajeCorreo = "\n                ".concat(estiloGeneral, "\n                <div class=\"container\">\n                    <p>Hola <strong>").concat(pedido.nombre, "</strong>,</p>\n                    <p>Su pedido <strong>").concat(pedido.idPedido, "</strong> est\xE1 actualmente en estado: <strong>Pendiente de revisi\xF3n</strong>.</p>\n                    <p>Estamos revisando su pedido y le notificaremos cuando haya actualizaciones.</p>\n                    <p>Gracias por su paciencia.</p>\n                </div>\n            ");
      break;
    case '2':
      // Aprobado
      mensajeCorreo = "\n                ".concat(estiloGeneral, "\n                <div class=\"container\">\n                    <p>Hola <strong>").concat(pedido.nombre, "</strong>,</p>\n                    <p>\xA1Su pedido <strong>").concat(pedido.idPedido, "</strong> ha sido aprobado!</p>\n                    <p>Gracias por elegirnos. Su pedido ser\xE1 procesado y pronto recibir\xE1 m\xE1s detalles.</p>\n                    <div class=\"footer\">\xA1Gracias por su confianza!</div>\n                </div>\n            ");
      break;
    case '3':
      // Rechazado
      mensajeCorreo = "\n                ".concat(estiloGeneral, "\n                <div class=\"container\">\n                    <p>Hola <strong>").concat(pedido.nombre, "</strong>,</p>\n                    <p>Lamentablemente, su pedido <strong>").concat(pedido.idPedido, "</strong> ha sido <strong>Rechazado</strong>.</p>\n                    <p>Disculpe los inconvenientes. Si necesita m\xE1s informaci\xF3n, no dude en contactarnos.</p>\n                    <div class=\"footer\">Gracias por su comprensi\xF3n.</div>\n                </div>\n            ");
      break;
    case '4':
      // Pendiente de pago
      mensajeCorreo = "\n                ".concat(estiloGeneral, "\n                <div class=\"container\">\n                    <p>Hola <strong>").concat(pedido.nombre, "</strong>,</p>\n                    <p>Su pedido <strong>").concat(pedido.idPedido, "</strong> est\xE1 pendiente de pago.</p>\n                    <p>El monto total es de <strong class=\"highlight\">").concat(montoTotal, "</strong>, debe realizar el pago del 50% que corresponde a <strong class=\"highlight\">").concat(anticipo, "</strong>, \n                    al n\xFAmero de SINPE <strong>89135112</strong> para continuar con el proceso. Favor adjuntar la captura a Whatsapp al mismo n\xFAmero de SINPE.</p>\n                    <p>\xA1Gracias por su preferencia! Estamos listos para continuar cuando complete el pago.</p>\n                    <div class=\"footer\">Quedamos a su disposici\xF3n para cualquier consulta.</div>\n                </div>\n            ");
      break;
    case '5':
      // Anticipo pagado
      mensajeCorreo = "\n                ".concat(estiloGeneral, "\n                <div class=\"container\">\n                    <p>Hola <strong>").concat(pedido.nombre, "</strong>,</p>\n                    <p>Hemos recibido un anticipo del 50% de su pedido <strong>").concat(pedido.idPedido, "</strong>. El monto pagado es de <strong class=\"highlight\">").concat(anticipo, "</strong>.</p>\n                    <p>El saldo pendiente es de <strong class=\"highlight\">").concat(anticipo, "</strong>, que debe ser pagado para completar el pedido.</p>\n                    <p>Por favor, complete el pago al n\xFAmero de SINPE <strong>89135112</strong> y adjuntar la captura a Whatsapp al mismo n\xFAmero de SINPE.</p>\n                    <div class=\"footer\">Gracias por su pago. Quedamos a la espera del saldo.</div>\n                </div>\n            ");
      break;
    case '6':
      // Pagado
      mensajeCorreo = "\n                ".concat(estiloGeneral, "\n                <div class=\"container\">\n                    <p>Hola <strong>").concat(pedido.nombre, "</strong>,</p>\n                    <p>\xA1Su pedido <strong>").concat(pedido.idPedido, "</strong> ha sido pagado en su totalidad! El monto total de <strong class=\"highlight\">").concat(montoTotal, "</strong> ha sido recibido correctamente.</p>\n                    <p>Gracias por su compra. El proceso de env\xEDo comenzar\xE1 en breve.</p>\n                    <div class=\"footer\">\xA1Gracias por elegirnos!</div>\n                </div>\n            ");
      break;
    case '7':
      // Pedido terminado (Factura)
      var detallesPedido = pedido.detalle.map(function (detalle) {
        return "<tr><td>".concat(detalle.producto.nombre, "</td><td>").concat(detalle.cantidad, "</td><td>").concat(detalle.montoXCantidad, "</td></tr>");
      }).join('');
      mensajeCorreo = "\n                ".concat(estiloGeneral, "\n                <div class=\"container\">\n                    <p>Hola <strong>").concat(pedido.nombre, "</strong>,</p>\n                    <p>El pedido <strong>").concat(pedido.idPedido, "</strong> ha sido completado y est\xE1 listo para su entrega.</p>\n                    <br>\n                    <table class=\"invoice-table\">\n                        <thead>\n                            <tr>\n                                <th> Producto </th>\n                                <th> Cantidad </th>\n                                <th> Precio </th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            ").concat(detallesPedido, "\n                        </tbody>\n                    </table>\n                    <br>\n                    <p><strong>Total a Pagar: ").concat(montoTotal, "</strong></p>\n                    <div class=\"footer\">\xA1Gracias por su preferencia! Esperamos que haya disfrutado de su experiencia con nosotros.</div>\n                </div>\n            ");
      break;
  }
  return mensajeCorreo;
};

// Función principal para editar el estado
var editarEstado = exports.editarEstado = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var idPedido, idEstado, existePedido, existeEstado, mensajeCorreo, formato;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          idPedido = req.params.idPedido;
          idEstado = req.body.idEstado;
          _context3.prev = 2;
          _context3.next = 5;
          return _pedido.Pedido.findByPk(idPedido, {
            include: [{
              model: _estado.Estado,
              as: 'estado'
            }, {
              model: _detallePedido.DetallePedido,
              as: 'detalle',
              include: [{
                model: _producto.Producto,
                as: 'producto'
              }]
            }]
          });
        case 5:
          existePedido = _context3.sent;
          if (!(existePedido === null)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            error: "El pedido no existe"
          }));
        case 8:
          _context3.next = 10;
          return _estado.Estado.findByPk(idEstado);
        case 10:
          existeEstado = _context3.sent;
          if (!(existeEstado === null)) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            error: "El estado no existe"
          }));
        case 13:
          _context3.next = 15;
          return _pedido.Pedido.update({
            idEstado: idEstado
          }, {
            where: {
              idPedido: idPedido
            }
          });
        case 15:
          mensajeCorreo = generarMensajeEstado(idEstado, existePedido);
          console.log("Correo", mensajeCorreo);
          // Enviar el correo con el mensaje correspondiente
          formato = {
            from: _config["default"].email,
            to: existePedido.correo,
            subject: "Delicias Lyn - Actualizaci\xF3n de su pedido ".concat(idPedido),
            html: mensajeCorreo
          };
          _context3.next = 20;
          return _nodemailer["default"].sendMail(formato);
        case 20:
          res.status(201).json({
            message: "Estado del pedido editado exitosamente y notificación enviada."
          });
          _context3.next = 27;
          break;
        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](2);
          console.error(_context3.t0);
          res.status(500).json({
            error: "Error interno en el servidor"
          });
        case 27:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 23]]);
  }));
  return function editarEstado(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var editarPrioridad = exports.editarPrioridad = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var idPedido, prioridad, existePedido, prioridadPedidoEdit;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          idPedido = req.params.idPedido;
          prioridad = req.body.prioridad;
          _context4.prev = 2;
          _context4.next = 5;
          return _pedido.Pedido.findByPk(idPedido);
        case 5:
          existePedido = _context4.sent;
          if (!(existePedido !== null)) {
            _context4.next = 13;
            break;
          }
          _context4.next = 9;
          return _pedido.Pedido.update({
            prioridad: prioridad
          }, {
            where: {
              idPedido: idPedido
            }
          });
        case 9:
          prioridadPedidoEdit = _context4.sent;
          res.status(201).json({
            message: "Prioridad del pedido editado exitosamente"
          });
          _context4.next = 14;
          break;
        case 13:
          res.status(404).json({
            error: "El pedido no existe"
          });
        case 14:
          _context4.next = 19;
          break;
        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](2);
          res.status(500).json({
            error: "Error interno en el servidor"
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 16]]);
  }));
  return function editarPrioridad(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var filtrarPorEstado = exports.filtrarPorEstado = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var idEstado, queryOptions, pedidos;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          idEstado = req.params.idEstado;
          console.log("idEstado", idEstado);
          queryOptions = {
            where: {
              idEstado: idEstado
            },
            // Asegúrate de incluir el filtro dentro de queryOptions
            include: [{
              model: _estado.Estado,
              as: "estado",
              attributes: ["idEstado", "nombre"]
            }, {
              model: _direccion.Direccion,
              as: "direccion",
              attributes: ["idDireccion", "direccionExacta"],
              include: [{
                model: _provincia.Provincia,
                as: "provincia",
                attributes: ['nombre']
              }, {
                model: _canton.Canton,
                as: "canton",
                attributes: ['nombre']
              }, {
                model: _distrito.Distrito,
                as: "distrito",
                attributes: ['nombre']
              }]
            }, {
              model: _detallePedido.DetallePedido,
              as: "detalle",
              attributes: ["idPedido", "idProducto", "cantidad", "montoXCantidad", "personalizacion"],
              include: [{
                model: _producto.Producto,
                as: "producto",
                attributes: ['nombre', 'precio', 'descripcion', 'tipo', 'estado'],
                include: [{
                  model: _categoria.Categoria,
                  as: "categoria",
                  attributes: ['idCategoria', 'nombre']
                }, {
                  model: _subcategoria.Subcategoria,
                  as: "subcategoria",
                  attributes: ['idSubcategoria', 'nombre']
                }]
              }, {
                model: _tamaño.Tamaño,
                as: "tamaño",
                attributes: ['idTamaño', 'nombre']
              }]
            }],
            // Ordenar primero por prioridad (de forma descendente) y luego por fechaEntrega (también descendente)
            order: [['prioridad', 'DESC'],
            // Ordenar por prioridad de forma descendente
            ['fechaEntrega', 'DESC'] // Ordenar por fechaEntrega de forma descendente
            ]
          }; // Ahora la consulta incluye el filtro donde idEstado está dentro de queryOptions
          _context5.next = 6;
          return _pedido.Pedido.findAll(queryOptions);
        case 6:
          pedidos = _context5.sent;
          res.status(200).json(pedidos);
          _context5.next = 14;
          break;
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json({
            error: "Error interno del servidor"
          });
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function filtrarPorEstado(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var filtrarPorUsuario = exports.filtrarPorUsuario = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var idUsuario, queryOptions, pedidos;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          idUsuario = req.params.idUsuario;
          if (idUsuario) {
            _context6.next = 4;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            error: "El parámetro idUsuario es obligatorio"
          }));
        case 4:
          queryOptions = {
            include: [{
              model: _estado.Estado,
              as: "estado",
              attributes: ["idEstado", "nombre"]
            }, {
              model: _direccion.Direccion,
              as: "direccion",
              attributes: ["idDireccion", "direccionExacta"],
              include: [{
                model: _provincia.Provincia,
                as: "provincia",
                attributes: ['nombre']
              }, {
                model: _canton.Canton,
                as: "canton",
                attributes: ['nombre']
              }, {
                model: _distrito.Distrito,
                as: "distrito",
                attributes: ['nombre']
              }]
            }, {
              model: _detallePedido.DetallePedido,
              as: "detalle",
              attributes: ["idPedido", "idProducto", "cantidad", "montoXCantidad", "personalizacion"],
              include: [{
                model: _producto.Producto,
                as: "producto",
                attributes: ['nombre', 'precio', 'descripcion', 'tipo', 'estado'],
                include: [{
                  model: _categoria.Categoria,
                  as: "categoria",
                  attributes: ['idCategoria', 'nombre']
                }, {
                  model: _subcategoria.Subcategoria,
                  as: "subcategoria",
                  attributes: ['idSubcategoria', 'nombre']
                }]
              }, {
                model: _tamaño.Tamaño,
                as: "tamaño",
                attributes: ['idTamaño', 'nombre']
              }]
            }],
            where: {
              idUsuario: idUsuario
            }
          };
          _context6.next = 7;
          return _pedido.Pedido.findAll(queryOptions);
        case 7:
          pedidos = _context6.sent;
          res.status(200).json(pedidos);
          _context6.next = 15;
          break;
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).json({
            error: "Error interno del servidor"
          });
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return function filtrarPorUsuario(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var filtrarPorId = exports.filtrarPorId = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var idPedido, queryOptions, pedidos;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          idPedido = req.params.idPedido;
          queryOptions = {
            where: {
              idPedido: idPedido
            },
            include: [{
              model: _estado.Estado,
              as: "estado",
              attributes: ["idEstado", "nombre"]
            }, {
              model: _direccion.Direccion,
              as: "direccion",
              attributes: ["idDireccion", "direccionExacta"],
              include: [{
                model: _provincia.Provincia,
                as: "provincia",
                attributes: ['nombre']
              }, {
                model: _canton.Canton,
                as: "canton",
                attributes: ['nombre']
              }, {
                model: _distrito.Distrito,
                as: "distrito",
                attributes: ['nombre']
              }]
            }, {
              model: _detallePedido.DetallePedido,
              as: "detalle",
              attributes: ["idPedido", "idProducto", "cantidad", "montoXCantidad", "personalizacion"],
              include: [{
                model: _producto.Producto,
                as: "producto",
                attributes: ['nombre', 'precio', 'descripcion', 'tipo', 'estado'],
                include: [{
                  model: _categoria.Categoria,
                  as: "categoria",
                  attributes: ['idCategoria', 'nombre']
                }, {
                  model: _subcategoria.Subcategoria,
                  as: "subcategoria",
                  attributes: ['idSubcategoria', 'nombre']
                }]
              }, {
                model: _tamaño.Tamaño,
                as: "tamaño",
                attributes: ['idTamaño', 'nombre']
              }]
            }]
          };
          _context7.next = 5;
          return _pedido.Pedido.findOne(queryOptions);
        case 5:
          pedidos = _context7.sent;
          res.status(200).json(pedidos);
          _context7.next = 13;
          break;
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          res.status(500).json({
            error: "Error interno del servidor"
          });
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function filtrarPorId(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();