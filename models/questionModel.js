const { Sequelize, DataTypes, ENUM } = require("sequelize");
const sequelize = require("./config");

const Question = sequelize.define("Question", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    question_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    question_type: {
        type: ENUM('multiple_choice', 'true_false'),
        defaultValue: 'multiple_choice',
        allowNull: false,
    },
    correct_answer_label: {
        type: ENUM('A', 'B', 'C', 'D', 'True', 'False'),
        allowNull: false,
    }
});

module.exports = Question;