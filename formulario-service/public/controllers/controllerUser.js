
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

router.post('/add', async(req, res) => {
   console.log('probando esquema');
    var { nombre, apellidos,fechaNacimiento,  rut, email, direccion, region, comuna, fotoPerfil} = req.body;
    // logica de login
    var nombre = "Juanito";
    var apellidos = "Juanito";
    var fechaNacimiento = "03-05-2009";
    var rut = "22222222-2";
    var email = "test@test.cl";
    var direccion = "calle";
    var region = "Santiago";
    var comuna = "Santiago";
    var fotoPerfil = "foto";
    var xlogin = new modelUser({ nombre: nombre, apellidos: apellidos, fechaNacimiento: fechaNacimiento,
        rut: rut, email: email, direccion: direccion, region: region,comuna: comuna,fotoPerfil: fotoPerfil});


    await xlogin.save((error, signup) => {
        console.log('intentando agregar usuario');
        if (error) {
            if (error.code == 11000) {
                responseb.error = true;
                responseb.codigo = 401;
                responseb.mensaje = 'Ya Existe este usuario';
                res.status(401).send({
                    responseb
                });
            } else {
                responseb.error = true;
                responseb.codigo = 304;
                responseb.mensaje = error.code;
                res.status(304).send({
                    responseb
                });
            }
        } else {
           responseb.error = true;
            responseb.codigo = 200;
            responseb.mensaje = {
                id: signup._id,
                tk: token
            };
            res.send({
                responseb
            });
        }
        
    });

    });

    function addUser( req, res){
    console.log('tratando de gusradar esquema', req.body.fechaNacimiento);
     var usuario = new modelUser();

     const f = Date.parse("2018/10/30");
     console.log('tratando de gusradar esquema', f);
     var fech = new Date(f);
     var fi = new Date(1540868400000);

     console.log('fecha obtenida', fi);

     usuario.nombre = req.body.nombre || '';
     usuario.apellidos = req.body.apellidos || '';
     usuario.fechaNacimiento = new Date();
     usuario.rut = req.body.rut || '';
     usuario.email = req.body.email || '';
     usuario.direccion = req.body.direccion || '';
     usuario.region = req.body.region || '';
     usuario.direccion = req.body.direccion || '';
     usuario.comuna = req.body.comuna || '';
     usuario.fotoPerfil = req.body.fotoPerfil || '';
 
    
     /*usuario.nombre = 'pedrito';
     usuario.apellidos = 'test';
     usuario.fechaNacimiento = new Date();
     usuario.rut = 'test';
     usuario.email = 'test';
     usuario.direccion = 'test';
     usuario.region = 'test';
     usuario.direccion = 'test';
     usuario.comuna = 'test';
     usuario.fotoPerfil = 'test';*/

     console.log('usuario obtenido', usuario);
     usuario.save(function(err) {
        if (err) throw err;
        var response = {};
        response.codigo = 200;
        response.mensaje = {
            message: "successfully"
        };
        res.send({
            response
        });
        console.log('Author successfully saved.');
      
        
     });
    }

    function pruebas(req, res){
 
        // Devolvemos una respuesta en JSON
            res.status(200).send({
                menssage: 'Esta ruta es de prueba en mi api restful con mongo y node'
            });
     }
        

    module.exports = {
        pruebas,addUser
    };
    

    /*router.route('/').get(function (req, res) {
        User.find()
        .then(function (users) {
            res.locals.users = users;
            return res.render('users/users.html');
        });
    });*/
