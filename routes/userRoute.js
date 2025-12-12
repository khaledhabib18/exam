const { login, signup } = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');
const express = require('express');
const userRoutes = express.Router();
const cors = require('cors');
const createAdmin = require("../controllers/createAdmin");
userRoutes.use(express.json());
userRoutes.use(cors());

userRoutes.post('/signup', signup);
userRoutes.post('/login', login);
userRoutes.post('/admin', (req, res) => {
    createAdmin(req, res);
});
module.exports = userRoutes;
