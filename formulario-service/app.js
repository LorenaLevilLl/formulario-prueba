/**
 * Aplicacion prueba
 * Data: 10/02/2020
 * Author: lorena levil
 */


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
const approutes = require('./public/routes/rutas');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', approutes);

app.use(express.static('public'));

app.listen(port);
console.log('Aplicacion de corriendo en..: ', port);

module.exports = app;
