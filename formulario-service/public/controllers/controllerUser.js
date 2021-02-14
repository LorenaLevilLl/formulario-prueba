const serviceUser = require('../services/userService');

function addUser(req, res) {
  const response = serviceUser.addUsuario(req);
  res.send(response);
}

function existeRut(req, res) {
  serviceUser.existeRut(req).then((response) => {
    console.log('response :: ', response);
    res.status(200).send(response);
  });
}

function validaDv(req, res) {
  const dv = serviceUser.getDigitoV(req);
  res.status(200).send({
    status: true,
    message: dv
  });
}

module.exports = { addUser, existeRut , validaDv  };
