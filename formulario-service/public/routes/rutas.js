const express = require('express');

const userController = require('../controllers/controllerUser');

const api = express.Router();

api.post('/add', userController.addUser);
api.post('/validaRut', userController.existeRut);
api.post('/validaDv', userController.validaDv);

module.exports = api;
