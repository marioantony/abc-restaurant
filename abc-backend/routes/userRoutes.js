// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to create a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
});

module.exports = router;
