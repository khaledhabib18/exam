const Answer = require('../models/answerModel');

async function markAnswers(req, res) {
    try {
        const answersData = req.body.answers; // Expecting an array of answers
        const savedAnswers = [];
        for (const answerData of answersData) {
            const answer = await Answer.create({
                attemptId: answerData.attemptId,
                questionId: answerData.questionId,
                selection: answerData.selection
            });
            savedAnswers.push(answer);
        }
        res.status(201).json(savedAnswers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { markAnswers };