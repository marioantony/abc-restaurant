const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: { type: String, enum: ['Admin', 'Staff', 'Customer'], default: 'Customer' },
    password: String,
});

module.exports = mongoose.model('User', UserSchema);