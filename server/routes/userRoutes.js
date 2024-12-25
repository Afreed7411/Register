const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
    try {
        const { name, age, email, phone, gender, password } = req.body;

        // Validate input fields
        if (!name || !age || !email || !phone || !gender || !password) {
            return res.status(400).send("All fields are required.");
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Email is already registered.");
        }

        // Create new user
        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).send("User registered successfully.");
    } catch (error) {
        res.status(500).send("Error registering user: " + error.message);
    }
});

module.exports = router;
