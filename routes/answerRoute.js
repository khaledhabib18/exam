const express = require('express');
const answerRoutes = express.Router();
const cors = require('cors');
const { authorize } = require('../middlewares/auth');
answerRoutes.use(express.json());
answerRoutes.use(cors());
const { markAnswers, getResults, getAllStudentsGrades } = require('../controllers/answerController');

answerRoutes.post("/answer", authorize('student'), markAnswers);
answerRoutes.get("/results", authorize('student', 'teacher'), getResults);
answerRoutes.get("/student-results", authorize('teacher'), getAllStudentsGrades)
module.exports = answerRoutes;