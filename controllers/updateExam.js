const Exam = require("../models/examModel.js");

const updateExam = (req, res) => {
    const examId = req.query.id;
    if (!examId) {
        return res.status(400).json({ message: "Exam ID is required" });
    }
    Exam.update(req.body, { where: { id: examId } })
        .then(([updated]) => {
            if (updated) {
                res.status(200).json({ message: "Exam updated successfully" });
            } else {
                res.status(404).json({ message: "Exam not found" });
            }
        })
        .catch((error) => {
            console.error("Error updating exam:", error);
            res.status(500).json({ message: "Internal server error" });
        });
};

module.exports = updateExam;