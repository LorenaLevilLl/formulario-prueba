const { response } = require('express');
const Modeluser = require('../model/user');

// eslint-disable-next-line func-names
const addUsuario = function (req) {
  const usuario = new Modeluser();
  const fechaAux = Date.parse(req.body.fechaNacimiento);
  const fechaDef = new Date(fechaAux);

  let foto = null;
  if (req.body.fotoPerfil != null) {
    foto = { data: req.body.fotoPerfil.data, contentType: req.body.fotoPerfil.contentType };
  }

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
  return new Promise(((resolve, reject) => {
    usuario.save((err) => {
      if (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        const error = 'Error '+err;
        reject({ status: true, message: error });
      } else {
        resolve({ status: true, message: 'successfully' });
      }
    });
  }));
};

// eslint-disable-next-line func-names
const existeRut = function (req) {
  const rutReq = req.body.rut || '';
  // const usuario = new Modeluser();
  console.log('verificando si existeRut');
  return new Promise(((resolve, reject) => {
    Modeluser.find({
      rut: rutReq,
    }, (err, a) => {
      if (err) {
        reject(err);
      } else if (a.length > 0) {
        console.log('paso por qui');
        resolve({
          status: true,
          menssage: 'Rut ya existe',
        });
      } else {
        console.log('paso por quo');
        resolve({
          status: false,
          menssage: 'Rut no existe',
        });
      }
    });
  }));
};

const findAddress = function (req) {
  const rutReq = req.body.rut || '';
  const usuario = new Modeluser();
  return new Promise(((resolve, reject) => {
    usuario.find({ rut: rutReq }, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        console.log('uus :: ', doc);
        resolve(doc);
      }
    });
  }));
};

/**
 * Ontiene el digito verificar de un rut sin puntos ni guiones
 * @param {} rut
 */
function getDigitoV(req) {
  const rut = req.body.rut || '';
  if (!rut || !rut.length || typeof rut !== 'string') {
    return -1;
  }
  const secuencia = [2, 3, 4, 5, 6, 7, 2, 3];
  let sum = 0;
  for (let i = rut.length - 1; i >= 0; i--) {
    const d = rut.charAt(i);
    sum += new Number(d) * secuencia[rut.length - (i + 1)];
  }
  const rest = 11 - (sum % 11);
  return rest === 11 ? 0 : rest === 10 ? 'k' : rest;
}


module.exports = {
  existeRut, getDigitoV, addUsuario, findAddress,
};
