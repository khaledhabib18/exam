const Exam = require("../models/examModel.js");

const getExams = (req, res) => {
    console.log(req.query);
    if (req.query && req.query.id) {
        Exam.findByPk(req.query.id)
            .then((exam) => {
                if (!exam) {
                    return res.status(404).json({ message: "Exam not found" });
                }
                res.status(200).json({ exam });
            })
            .catch((error) => {
                console.error("Error fetching exam:", error);
                res.status(500).json({ message: "Internal server error" });
            });
    }
    else {
        Exam.findAll()
            .then((exams) => {
                res.status(200).json({ exams });
            })
            .catch((error) => {
                console.error("Error fetching exams:", error);
                res.status(500).json({ message: "Internal server error" });
            });
    }
};

module.exports = getExams;