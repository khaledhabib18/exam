const e = require("express");
const Exam = require("../models/examModel");
const { DateTime } = require('luxon');

const checkIfInTime = async (req, res, examId) => {
    try {
        const exam = await Exam.findByPk(examId);
        if (!exam) {
            return false;
        }
        const currentTime = new Date();
        console.log(currentTime);
        if (currentTime >= exam.start_time && currentTime <= exam.end_time) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking exam time:", error);
        return false;
    }
};

module.exports = checkIfInTime;