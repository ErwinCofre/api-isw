////servidor con express
const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
//// parse json para el body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar las rutas
app.use(require("./server/config/rutas"));

//ruta de prueba///
app.get("/api", (req, res) => {
    return res.status(200).json({
        ok: true,
        message: "API de Prueba",
    });
});

app.listen(process.env.PORT, () => {
    console.log("conectado al puerto " + process.env.PORT);
});
