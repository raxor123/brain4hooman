const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    providerId: String,
    email: String
});

mongoose.model('users', userSchema)