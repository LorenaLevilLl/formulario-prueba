'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
const cors = require('cors');
 
// Cargamos el controlador
var userController = require('../controllers/controllerUser');
 
// Llamamos al router
var api = express.Router();
 
// Creamos una ruta de tipo GET para el método de pruebas
api.get('/pruebas', userController.pruebas);

api.get('/add', userController.addUser);

api.post('/add', userController.addUser);
api.post('/validaRut', userController.existeRut);
api.post('/validaDv', userController.validaDv);
 
// Exportamos la configuración
module.exports = api;
