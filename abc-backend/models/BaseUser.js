const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define a base user schema
const baseUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'staff', 'customer'],
        default: 'customer',
    }
}, { timestamps: true });

// BaseUser class to encapsulate user behaviors
class BaseUser {
    constructor(user) {
        this.user = user;
    }

    // Method to hash the password
    async hashPassword() {
        this.user.password = await bcrypt.hash(this.user.password, 10);
    }

    // Method to save the user
    async save() {
        await this.hashPassword();
        const savedUser = await this.user.save();
        return savedUser;
    }

    // Static method to find a user by email
    static async findByEmail(email) {
        return await mongoose.model('User').findOne({ email });
    }
}

// Create and export the User model
const User = mongoose.model('User', baseUserSchema);

module.exports = { User, BaseUser };
