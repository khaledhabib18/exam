const express = require('express');
const answerRoutes = express.Router();
const cors = require('cors');
const { authorize } = require('../middlewares/auth');
answerRoutes.use(express.json());
answerRoutes.use(cors());
const { markAnswers } = require('../controllers/answerController');

answerRoutes.post("/answer", authorize('student'), markAnswers);

module.exports = answerRoutes;