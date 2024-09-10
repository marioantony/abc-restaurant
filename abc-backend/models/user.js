const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'staff', 'customer'], required: true },
});

// OOP principle: Define methods or statics
userSchema.methods.getFullName = function () {
    return `${this.name}`;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
