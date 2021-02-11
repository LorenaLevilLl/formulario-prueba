'use strict';
const mongoose = require('../config/mongoose'),
userSchema = require('../schemas/schema');

//const models = {
//const user mongoose.model('userSchema', userSchema)

//};

module.exports =  mongoose.model('User', userSchema)