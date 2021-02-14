
const mongoose = require('../config/mongoose');
const userSchema = require('../schemas/schema');

// const models = {
// const user mongoose.model('userSchema', userSchema)

// };

module.exports = mongoose.model('User', userSchema);
