const Question = require("./questionModel");
const Exam = require("./examModel");

Exam.hasMany(Question, { foreignKey: 'examId', as: 'questions' });
Question.belongsTo(Exam, { foreignKey: 'examId', as: 'exam' });

module.exports = { Question, Exam };
