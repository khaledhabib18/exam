const express = require('express');
const questionRoutes = express.Router();
const cors = require('cors');
const { authorize } = require('../middlewares/auth');
const { createQuestion, deleteQuestion, getExamQuestions } = require('../controllers/questionController');
questionRoutes.use(express.json());
questionRoutes.use(cors());

questionRoutes.post("/question", authorize('teacher'), createQuestion);
questionRoutes.delete("/question", authorize('teacher'), deleteQuestion);
questionRoutes.get("/question", authorize('teacher', 'student'), getExamQuestions);
module.exports = questionRoutes;