const Exam = require("../models/examModel.js");

const createExam = (req, res) => {
    Exam.create(req.body)
        .then((exam) => {
            res.status(201).json({ message: "Exam created successfully", exam });
        })
        .catch((error) => {
            console.error("Error creating exam:", error);
            res.status(500).json({ message: "Internal server error" });
        });
};

module.exports = createExam;
