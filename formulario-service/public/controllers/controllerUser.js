
'use strict';
const express = require('express');
const cors = require('cors');
const { modelName } = require('../model/user');
const router = express.Router();
const modelUser = require('../model/user');



router.get('/', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'Envio mi mensajito',
        version: '1.0.0',
    });
});

function addUser(req, res) {
    console.log('tratando de gusradar esquema', req.body.fechaNacimiento);
    var usuario = new modelUser();
    const fechaAux = Date.parse(req.body.fechaNacimiento);
    var fechaDef = new Date(fechaAux);

    var foto = null;
    var foto = {data:req.body.fotoPerfil.data, contentType:req.body.fotoPerfil.contentType}
    usuario.nombre = req.body.nombre || '';
    usuario.apellidos = req.body.apellidos || '';
    usuario.fechaNacimiento = fechaDef;
    usuario.rut = req.body.rut || '';
    usuario.email = req.body.email || '';
    usuario.direccion = req.body.direccion || '';
    usuario.region = req.body.region || '';
    usuario.direccion = req.body.direccion || '';
    usuario.comuna = req.body.comuna || '';
    usuario.fotoPerfil = foto || '';

    usuario.save(function (err) {
        if (err) throw err;
        var response = {};
        response.codigo = 200;
        response.mensaje = {
            message: "successfully"
        };
        res.send({
            response
        });
    });
}

function pruebas(req, res) {

    // Devolvemos una respuesta en JSON
    res.status(200).send({
        menssage: 'Esta ruta es de prueba en mi api restful con mongo y node'
    });
}

function existeRut(req, res) {
    var rutReq = req.body.rut || '';
    modelUser.find({
        rut: rutReq
    }, function callback(error, a) {
        if (a.length > 0) {
            res.status(200).send({
                status: true,
                menssage: 'Rut ya existe'
            });
        } else {
            res.status(200).send({
                status: false,
                menssage: 'Rut no existe'
            });
        }
    })
}


module.exports = { pruebas, addUser, existeRut };
