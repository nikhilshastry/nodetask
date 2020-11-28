const Joi = require('joi');
const mongoose = require('mongoose');
 
const User_Roles = mongoose.model('User_Roles', new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    role: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 10,
    }
}));

exports.User_Roles = User_Roles;