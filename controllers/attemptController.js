const Attempt = require("../models/attemptModel");
const { get } = require("../routes/userRoute");
const getUserIdFromReq = require('../utils/getUserIdFromReq');


const createAttempt = async (req, res) => {
    try {
        req.body.userId = getUserIdFromReq(req);
        req.body.examId = req.query.examId;
        console.log(req.body);
        const attempt = await Attempt.create({
            userId: req.body.userId,
            examId: req.body.examId,
            started_at: new Date(),
            finished_at: null
        });
        res.status(201).json(attempt);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const finishAttempt = async (req, res) => {
    try {
        const userId = getUserIdFromReq(req);
        const examId = req.query.examId;
        const attempt = await Attempt.findOne({
            where: { userId, examId }
        });
        if (!attempt) {
            return res.status(404).json({ error: 'Attempt not found' });
        }
        attempt.finished_at = new Date();
        await attempt.save();
        res.status(200).json(attempt);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createAttempt, finishAttempt };