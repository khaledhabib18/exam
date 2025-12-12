const express = require('express');
const examRoutes = express.Router();
const cors = require('cors');
const { authorize } = require('../middlewares/auth');
const { createExam, getExams, updateExam, deleteExam } = require('../controllers/examController');
examRoutes.use(express.json());
examRoutes.use(cors());


examRoutes.post("/exam", authorize('teacher'), createExam);
examRoutes.get("/exam", authorize('student', 'teacher'), getExams);
examRoutes.delete("/exam", authorize('teacher'), deleteExam);
examRoutes.put("/exam", authorize('teacher'), updateExam);
module.exports = examRoutes;