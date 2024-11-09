// Aquí se inicializa express y se le dice que permita JSON
import express from 'express';
import config from './config/config';

const nodemailer = require("./routes/nodemailer.routes");
const admin = require("./routes/usuario.routes");
const auth = require("./routes/auth.routes");

const categoria = require("./routes/categoria.routes");
const subcategoria = require("./routes/subcategoria.routes");
const canton = require("./routes/canton.routes");
const informe = require("./routes/informe.routes");
//const pedido = require("./routes/pedido.routes"); 
//const producto = require("./routes/producto.routes"); 
//const carrito = require("./routes/carrito.routes");

const app = express();
const cors = require("cors");

// Configuración
app.set("port", config.port);

// Middleware
app.use(cors());
app.use(express.json());

// Rutas (Agregar todas las rutas que existan en Routes)
app.use("/nodemailer", nodemailer);
app.use("/usuario", admin);
app.use("/auth", auth);
app.use("/categoria", categoria);
app.use("/subcategoria", subcategoria);
app.use("/canton", canton);
app.use("/informe", informe);
//app.use("/pedido", pedido); 
//app.use("/producto", producto); 
//app.use("/carrito", carrito); 

export default app;
