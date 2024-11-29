"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _config = _interopRequireDefault(require("./config/config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Aquí se inicializa express y se le dice que permita JSON

var nodemailer = require("./routes/nodemailer.routes");
var admin = require("./routes/usuario.routes");
var auth = require("./routes/auth.routes");
var categoria = require("./routes/categoria.routes");
var subcategoria = require("./routes/subcategoria.routes");
var canton = require("./routes/canton.routes");
var distrito = require("./routes/distrito.routes");
var provincia = require("./routes/provincia.routes");
var direccion = require("./routes/direccion.routes");
var informe = require("./routes/informe.routes");
var carrito = require("./routes/carrito.routes");
var producto = require("./routes/producto.routes");
var estado = require("./routes/estado.routes");
var pedido = require("./routes/pedido.routes");
var tamaño = require("./routes/tamaño.routes");
var tamañoXproducto = require("./routes/tamañoXproducto.routes");
var app = (0, _express["default"])();
var cors = require("cors");

// Configuración
app.set("port", _config["default"].port);

// Middleware
app.use(cors());
app.use(_express["default"].json());

// Rutas (Agregar todas las rutas que existan en Routes)
app.use("/nodemailer", nodemailer);
app.use("/usuario", admin);
app.use("/auth", auth);
app.use("/categoria", categoria);
app.use("/subcategoria", subcategoria);
app.use("/canton", canton);
app.use("/distrito", distrito);
app.use("/provincia", provincia);
app.use("/direccion", direccion);
app.use("/informe", informe);
app.use("/carrito", carrito);
app.use("/producto", producto);
app.use("/estado", estado);
app.use("/pedido", pedido);
app.use('/tamano', tamaño);
app.use('/tamanoXproducto', tamañoXproducto);
var _default = exports["default"] = app;