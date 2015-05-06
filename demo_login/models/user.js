var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    gender: String,
    address: String
});