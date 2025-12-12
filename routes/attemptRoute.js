const express = require('express');
const attemptRoutes = express.Router();
const cors = require('cors');
const { authorize } = require('../middlewares/auth');
attemptRoutes.use(express.json());
attemptRoutes.use(cors());
const { createAttempt, finishAttempt } = require('../controllers/attemptController');


attemptRoutes.post("/attempt", authorize('student'), createAttempt);
attemptRoutes.put("/attempt", authorize('student'), finishAttempt);
module.exports = attemptRoutes;