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

const getExams = (req, res) => {
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


const deleteExam = (req, res) => {
    console.log("DELETE");
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


module.exports = {
    createExam,
    getExams,
    updateExam,
    deleteExam
};
