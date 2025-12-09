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

module.exports = { createQuestion };