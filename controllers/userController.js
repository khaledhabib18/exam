const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const e = require('express');
require('dotenv').config();

// this function creates the token for the user
const createSignToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
};

const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body; // destructuring 
        const hashed = await bcrypt.hash(password, 12); // hashing the password 

        // TODO replace it with repositories function instead of direct model access
        const user = await User.create({ email, password: hashed, name });
        res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (err) { res.status(500).json({ message: 'Signup failed', error: err.message }); }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Provide email and password' });

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = createSignToken(user);

        res.json({ token, user: { role: user.role } });
    } catch (err) { res.status(500).json({ message: 'Login failed', error: err.message }); }
};


module.exports = { signup, login };