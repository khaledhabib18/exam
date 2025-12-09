const express = require('express');
const examRoutes = express.Router();
const cors = require('cors');
const { authorize } = require('../middlewares/auth');
const createExam = require('../controllers/createExam')
examRoutes.use(express.json());
examRoutes.use(cors());


examRoutes.post("/create-exam", authorize('teacher'), createExam);

module.exports = examRoutes;