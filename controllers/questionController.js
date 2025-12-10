const Question = require("../models/questionModel");
const Option = require("../models/optionModel");
const { Op } = require("sequelize");
const createQuestion = async (req, res) => {
    try {
        const question = await Question.create({
            question_text: req.body.question_text,
            question_type: req.body.question_type,
            examId: req.query.examId,
            correct_answer_label: req.body.correct_answer_label
        });
        const options = req.body.options;
        await Option.bulkCreate(
            options.map(option => ({
                option_text: option.text,
                option_label: option.label,
                question_id: question.dataValues.id
            }))
        );
        res.status(201).json({ question });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.query;
        const deleted = await Question.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send("Question deleted");
        } else {
            res.status(404).json({ error: "Question not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getExamQuestions = async (req, res) => {
    try {
        const { examId } = req.query;
        const questions = await Question.findAll({
            where: { examId },
            attributes: ["id", "question_text", "question_type", "examId"]
        });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createQuestion, deleteQuestion, getExamQuestions };