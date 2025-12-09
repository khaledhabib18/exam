const Question = require("../models/questionModel");

// Create a new question
const createQuestion = async (req, res) => {
    try {
        const question = await Question.create(req.body);
        console.log(question);
        res.status(201).json(question);
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