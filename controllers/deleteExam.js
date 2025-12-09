const Exam = require("../models/examModel.js");

const deleteExam = (req, res) => {
    const examId = req.query.id;
    if (!examId) {
        return res.status(400).json({ message: "Exam ID is required" });
    }
    Exam.destroy({ where: { id: examId } })
        .then((deleted) => {
            if (deleted) {
                res.status(200).json({ message: "Exam deleted successfully" });
            } else {
                res.status(404).json({ message: "Exam not found" });
            }
        })
        .catch((error) => {
            console.error("Error deleting exam:", error);
            res.status(500).json({ message: "Internal server error" });
        });
};

module.exports = deleteExam;