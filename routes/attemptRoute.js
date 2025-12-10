const express = require('express');
const attemptRoutes = express.Router();
const cors = require('cors');
const { authorize } = require('../middlewares/auth');
attemptRoutes.use(express.json());
attemptRoutes.use(cors());
const { createAttempt, finishAttempt } = require('../controllers/attemptController');


attemptRoutes.post("/start-exam", authorize('student'), createAttempt);
attemptRoutes.post("/finish-exam", authorize('student'), finishAttempt);
module.exports = attemptRoutes;