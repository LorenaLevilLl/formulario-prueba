'use strict';
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/db-formulario');
require('../../model/user');

//mongoose.connect('mongodb://mongo/db-formulario', {
mongoose.connect('mongodb://localhost:27017/db-formulario', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(db => console.log('conexion exitosa'))
    .catch(err => console.log('error: ', err));

module.exports = mongoose;