/**
 * Aplicacion prueba
 * Data: 10/02/2020
 * Author: lorena levil
 */
'use strict'
 
var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
var app_routes = require('./public/routes/rutas');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', app_routes);

app.use(express.static('public'));

app.listen(port);
console.log('Aplicacion de corriendo en..: ', port);
 
module.exports = app;
