const Question = require("./questionModel");
const Exam = require("./examModel");
const Attempt = require("./attemptModel");
const User = require("./userModel");
const Option = require("./optionModel");

Exam.hasMany(Question, { foreignKey: 'examId', as: 'questions' });
Question.belongsTo(Exam, { foreignKey: 'examId', as: 'exam' });

User.hasMany(Attempt, { foreignKey: 'userId', as: 'attempts' });
Attempt.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Exam.hasMany(Attempt, { foreignKey: 'examId', as: 'attempts' });
Attempt.belongsTo(Exam, { foreignKey: 'examId', as: 'exam' });


Question.hasMany(Option, {
    foreignKey: 'question_id', as: 'options',
    onDelete: 'CASCADE',
    hooks: true
},);
Option.belongsTo(Question, {
    foreignKey: 'question_id', as: 'question',
    onDelete: 'CASCADE',
});

module.exports = { Question, Exam, Attempt, User, Option };