const Answer = require('../models/answerModel');
const Question = require('../models/questionModel');
const Attempt = require('../models/attemptModel');
const Option = require('../models/optionModel');
const User = require('../models/userModel');
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
        for (const ans of savedAnswers) {
            const question = await Question.findOne({ where: { id: ans.dataValues.questionId } });
            const attempt = await Attempt.findOne({ where: { id: ans.dataValues.attemptId } });
            if (ans.selection === question.correct_answer_label) {
                attempt.score += 1;
            }
            await attempt.save();
        };


        res.status(201).json(savedAnswers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getResults = async (req, res) => {
    try {
        const attemptId = req.query.attemptId;
        const attempt = await Attempt.findOne({ where: { id: attemptId } });
        const examId = attempt.examId;
        const examQuestions = await Question.findAll({ where: { examId } });
        const back = [];
        for (const question of examQuestions) {
            const answer = await Answer.findOne({ where: { attemptId, questionId: question.id } });
            const options = await Option.findAll({ where: { question_id: question.id } });
            const result = answer.selection === question.correct_answer_label ? 'correct' : 'incorrect';
            back.push({
                question_text: question.question_text,
                selected_answer: answer ? answer.selection : null,
                correct_answer: question.correct_answer_label,
                options: options.map(opt => ({ label: opt.option_label, text: opt.option_text })),
                result: result
            });
        }
        res.status(200).json(back);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllStudentsGrades = async (req, res) => {
    const examId = req.query.examId;
    const usersWithAttempts = await User.findAll({
        attributes: ['name'],
        include: [{
            model: Attempt,
            as: 'attempts',
            where: {
                examId: examId
            },
            attributes: ['score']
        }]
    })
    res.status(201).send(usersWithAttempts);
};
module.exports = { markAnswers, getResults, getAllStudentsGrades };