////servidor con express
const express = require('express');
const app = express();
app.use(require('../routes/rutaApi'));

module.exports = app;