//Aqui se inicializa express y se le dice que permita json

import express from 'express';
import config from './config/config';

const nodemailer = require("./routes/nodemailer.routes");
const admin = require("./routes/usuario.routes");
const categoria = require("./routes/categoria.routes");
const app = express();
const cors = require("cors");

//config
app.set("port",config.port);

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/nodemailer", nodemailer);
app.use("/usuario", admin);
app.use("/categoria", categoria);

export default app;