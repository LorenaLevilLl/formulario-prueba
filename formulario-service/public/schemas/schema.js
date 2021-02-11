
'use strict';
const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

//const schemas = {
const userShema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
      type: String,
      required: true
    },
    fechaNacimiento: {
        type: Date,
        default: new Date()
    },
    rut: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    direccion: {
      type: String,
      required: true
    },
    region: {
      type: String,
      required: true
    },
    comuna: {
      type: String,
      required: true
    },
    fotoPerfil: {
      type: String,
      required: true
    }
});



module.exports = userShema;