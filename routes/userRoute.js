const { login, signup } = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');
const express = require('express');
const userRoutes = express.Router();
const cors = require('cors');
userRoutes.use(express.json());
userRoutes.use(cors());

userRoutes.post('/api/v1/signup', signup);
userRoutes.post('/api/v1/login', login);
userRoutes.get('/profile', authenticate, (req, res) => { });
userRoutes.get('/admin', authenticate, authorize('admin'), (req, res) => { });

module.exports = userRoutes;
