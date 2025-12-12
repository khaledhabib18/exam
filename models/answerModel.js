const { Sequelize, DataTypes, ENUM } = require("sequelize");
const sequelize = require("./config");

const Answer = sequelize.define("Answer", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    attemptId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    questionId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    selection: {
        type: ENUM('A', 'B', 'C', 'D', 'True', 'False'),
        allowNull: false,
    }
});

module.exports = Answer;