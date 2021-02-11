'use strict';
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/db-formulario');
require('../../model/user');

mongoose.connect('mongodb://localhost:27017/db-formulario', {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true
    }).then(db => console.log('conexion exitosa'))
    .catch(err => console.log('error: ', err));

module.exports = mongoose;