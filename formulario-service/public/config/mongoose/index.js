
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/db-formulario');
require('../../model/user');

mongoose.connect('mongodb://mongo/db-formulario', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((db) => {
  console.log('conexion exitosa con db');
}).catch(err => console.log('error conexin bd : ', err));

module.exports = mongoose;
