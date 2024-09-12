const express = require('express');
const router = express.Router();
const { User, BaseUser } = require('../models/BaseUser');

// Registration endpoint
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await BaseUser.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user instance
        const newUser = new User({ name, email, password, role });
        const baseUser = new BaseUser(newUser);

        // Save the new user
        const savedUser = await baseUser.save();

        // Send success response
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: savedUser._id, name: savedUser.name, email: savedUser.email, role: savedUser.role, password: savedUser.password}
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
