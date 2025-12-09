const express = require('express');
const questionRoutes = express.Router();
const cors = require('cors');
const { authorize } = require('../middlewares/auth');
const { createQuestion } = require('../controllers/questionController');
questionRoutes.use(express.json());
questionRoutes.use(cors());

questionRoutes.post("/create-question", authorize('teacher'), createQuestion);

module.exports = questionRoutes;