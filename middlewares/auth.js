const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { all } = require('../routes/userRoute');
require('dotenv').config();

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        let token;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authenticated: token missing' });
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id: payload.id } });
        if (!user) return res.status(401).json({ message: 'Not authenticated: user not found' });

        req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        return res.status(401).json({ message: 'Not authenticated' });
    }
};

const authorize = (...allowedRoles) => {
    return async (req, res, next) => {
        if (!req.headers.authorization) return res.status(401).json({ message: 'Not authenticated' });
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const reqUser = (await User.findOne({ where: { id: payload.id } })).dataValues;
        if (!allowedRoles.includes(reqUser.role)) {
            return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
