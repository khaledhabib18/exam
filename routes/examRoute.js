const express = require('express');
const examRoutes = express.Router();
const cors = require('cors');
const { authorize } = require('../middlewares/auth');
const createExam = require('../controllers/createExam')
const getExams = require('../controllers/getExams');
const deleteExam = require('../controllers/deleteExam');
const updateExam = require('../controllers/updateExam');
examRoutes.use(express.json());
examRoutes.use(cors());


examRoutes.post("/create-exam", authorize('teacher'), createExam);
examRoutes.get("/get-exams", authorize('student', 'teacher'), getExams);
examRoutes.delete("/delete-exam", authorize('teacher'), deleteExam);
examRoutes.put("/update-exam", authorize('teacher'), updateExam);
module.exports = examRoutes;