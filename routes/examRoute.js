const express = require('express');
const examRoutes = express.Router();
const cors = require('cors');
const { authorize } = require('../middlewares/auth');
const createExam = require('../controllers/createExam')
const getExams = require('../controllers/getExams');
examRoutes.use(express.json());
examRoutes.use(cors());


examRoutes.post("/create-exam", authorize('teacher'), createExam);
examRoutes.get("/get-exams", authorize('student', 'teacher'), getExams);
module.exports = examRoutes;