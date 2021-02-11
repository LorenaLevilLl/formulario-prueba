/**
 * Aplicacion prueba
 * Data: 10/02/2020
 * Author: lorena levil
 */

/*const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Envio mi mensaje',
    version: '1.0.0',
  });
});

app.listen(port);
console.log('Aplicacion de corriendo en..: ', port);*/


'use strict'
 
var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
 
 
// Importamos las rutas
var app_routes = require('./public/routes/rutas');
 
// body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
 
// Configurar CORS
 
// Cargamos las rutas
app.use('/api', app_routes);

app.use(express.static('public'));

app.listen(port);
console.log('Aplicacion de corriendo en..: ', port);
 
//module.exports = app;
