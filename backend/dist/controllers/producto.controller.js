"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visualizarProductos = exports.filtrarProductoPorSubcategoria = exports.filtrarProductoPorNombre = exports.filtrarProductoPorId = exports.eliminarProductoPorId = exports.editarProductoPorId = exports.crearProducto = void 0;
var _producto = require("../models/producto.model");
var _categoria = require("../models/categoria.model");
var _subcategoria = require("../models/subcategoria.model");
var _sequelize = require("sequelize");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // Modelo del producto
// Modelo de la categoría
// Modelo de la subcategoría
// Para realizar búsquedas avanzadas

// Crear producto
var crearProducto = exports.crearProducto = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, idCategoria, idSubcategoria, nombre, descripcion, precio, personalizacion, imagen, tipo, estado, productoExistente, nuevoProducto;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, idCategoria = _req$body.idCategoria, idSubcategoria = _req$body.idSubcategoria, nombre = _req$body.nombre, descripcion = _req$body.descripcion, precio = _req$body.precio, personalizacion = _req$body.personalizacion, imagen = _req$body.imagen, tipo = _req$body.tipo, estado = _req$body.estado;
          console.log(req.body);
          _context.prev = 2;
          _context.next = 5;
          return _producto.Producto.findOne({
            where: {
              nombre: nombre
            }
          });
        case 5:
          productoExistente = _context.sent;
          if (productoExistente) {
            _context.next = 14;
            break;
          }
          _context.next = 9;
          return _producto.Producto.create({
            idCategoria: idCategoria,
            idSubcategoria: idSubcategoria,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            personalizacion: personalizacion,
            imagen: imagen,
            tipo: tipo,
            estado: estado
          });
        case 9:
          nuevoProducto = _context.sent;
          console.log(nuevoProducto);
          res.status(201).json({
            message: "Producto creado exitosamente"
          });
          _context.next = 15;
          break;
        case 14:
          res.status(409).json({
            error: "El producto ya existe"
          });
        case 15:
          _context.next = 21;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);
          res.status(500).json({
            error: "Error interno en el servidor"
          });
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 17]]);
  }));
  return function crearProducto(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Visualizar productos (incluyendo categorías y subcategorías relacionadas)
var visualizarProductos = exports.visualizarProductos = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var productos;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _producto.Producto.findAll({
            include: [{
              model: _categoria.Categoria,
              as: "categoria",
              // Relación con la categoría
              attributes: ["idCategoria", "nombre"]
            }, {
              model: _subcategoria.Subcategoria,
              as: "subcategoria",
              // Relación con la subcategoría
              attributes: ["idSubcategoria", "nombre"]
            }]
          });
        case 3:
          productos = _context2.sent;
          res.status(200).json(productos);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: "Error interno del servidor"
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function visualizarProductos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Filtrar producto por ID
var filtrarProductoPorId = exports.filtrarProductoPorId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, producto;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return _producto.Producto.findOne({
            where: {
              idProducto: id
            },
            include: [{
              model: _categoria.Categoria,
              as: "categoria",
              attributes: ["idCategoria", "nombre"]
            }, {
              model: _subcategoria.Subcategoria,
              as: "subcategoria",
              attributes: ["idSubcategoria", "nombre"]
            }]
          });
        case 4:
          producto = _context3.sent;
          if (producto) {
            res.status(200).json(producto);
          } else {
            res.status(404).json({
              error: "Producto no encontrado"
            });
          }
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            error: "Error interno del servidor"
          });
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function filtrarProductoPorId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Filtrar producto por nombre
var filtrarProductoPorNombre = exports.filtrarProductoPorNombre = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var nombre, producto;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          nombre = req.params.nombre;
          _context4.prev = 1;
          _context4.next = 4;
          return _producto.Producto.findOne({
            where: {
              nombre: nombre
            },
            include: [{
              model: _categoria.Categoria,
              as: "categoria",
              attributes: ["idCategoria", "nombre"]
            }, {
              model: _subcategoria.Subcategoria,
              as: "subcategoria",
              attributes: ["idSubcategoria", "nombre"]
            }]
          });
        case 4:
          producto = _context4.sent;
          if (producto) {
            res.status(200).json(producto);
          } else {
            res.status(404).json({
              error: "Producto no encontrado"
            });
          }
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          res.status(500).json({
            error: "Error interno del servidor"
          });
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return function filtrarProductoPorNombre(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Filtrar productos por subcategoría
var filtrarProductoPorSubcategoria = exports.filtrarProductoPorSubcategoria = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var idSubcategoria, productos;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          idSubcategoria = req.params.idSubcategoria; // Obtenemos el ID de la subcategoría desde los parámetros
          _context5.prev = 1;
          _context5.next = 4;
          return _producto.Producto.findAll({
            where: {
              idSubcategoria: idSubcategoria
            },
            include: [{
              model: _categoria.Categoria,
              as: "categoria",
              attributes: ["idCategoria", "nombre"]
            }, {
              model: _subcategoria.Subcategoria,
              as: "subcategoria",
              attributes: ["idSubcategoria", "nombre"]
            }]
          });
        case 4:
          productos = _context5.sent;
          if (productos.length > 0) {
            res.status(200).json(productos);
          } else {
            res.status(404).json({
              error: "No se encontraron productos en esta subcategoría"
            });
          }
          _context5.next = 12;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          console.error("Error al filtrar productos por subcategoría:", _context5.t0);
          res.status(500).json({
            error: "Error interno del servidor"
          });
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function filtrarProductoPorSubcategoria(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Eliminar producto por ID
var eliminarProductoPorId = exports.eliminarProductoPorId = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, producto;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return _producto.Producto.findByPk(id);
        case 4:
          producto = _context6.sent;
          if (!producto) {
            _context6.next = 11;
            break;
          }
          _context6.next = 8;
          return producto.destroy();
        case 8:
          res.status(200).json({
            message: "Producto eliminado exitosamente"
          });
          _context6.next = 12;
          break;
        case 11:
          res.status(404).json({
            error: "Producto no encontrado"
          });
        case 12:
          _context6.next = 17;
          break;
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](1);
          res.status(500).json({
            error: "Error interno del servidor"
          });
        case 17:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 14]]);
  }));
  return function eliminarProductoPorId(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// Editar producto por ID
var editarProductoPorId = exports.editarProductoPorId = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var id, _req$body2, nuevoNombre, descripcion, precio, personalizacion, imagen, tipo, estado, idCategoria, idSubcategoria, productoExistente, datosAActualizar;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, nuevoNombre = _req$body2.nuevoNombre, descripcion = _req$body2.descripcion, precio = _req$body2.precio, personalizacion = _req$body2.personalizacion, imagen = _req$body2.imagen, tipo = _req$body2.tipo, estado = _req$body2.estado, idCategoria = _req$body2.idCategoria, idSubcategoria = _req$body2.idSubcategoria;
          console.log("ID del producto: ".concat(id));
          console.log("Datos para actualizar:", req.body);
          _context7.prev = 4;
          _context7.next = 7;
          return _producto.Producto.findByPk(id);
        case 7:
          productoExistente = _context7.sent;
          if (!productoExistente) {
            _context7.next = 24;
            break;
          }
          datosAActualizar = {};
          if (nuevoNombre) datosAActualizar.nombre = nuevoNombre;
          if (descripcion) datosAActualizar.descripcion = descripcion;
          if (precio) datosAActualizar.precio = precio;
          if (personalizacion) datosAActualizar.personalizacion = personalizacion;
          if (imagen) datosAActualizar.imagen = imagen;
          if (tipo) datosAActualizar.tipo = tipo;
          if (estado) datosAActualizar.estado = estado;
          if (idCategoria) datosAActualizar.idCategoria = idCategoria;
          if (idSubcategoria) datosAActualizar.idSubcategoria = idSubcategoria;
          _context7.next = 21;
          return _producto.Producto.update(datosAActualizar, {
            where: {
              idProducto: id
            }
          });
        case 21:
          res.status(200).json({
            message: "Producto editado exitosamente"
          });
          _context7.next = 25;
          break;
        case 24:
          res.status(404).json({
            error: "Producto no encontrado"
          });
        case 25:
          _context7.next = 31;
          break;
        case 27:
          _context7.prev = 27;
          _context7.t0 = _context7["catch"](4);
          console.error("Error:", _context7.t0);
          res.status(500).json({
            error: "Error interno del servidor"
          });
        case 31:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[4, 27]]);
  }));
  return function editarProductoPorId(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();