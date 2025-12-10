const { Sequelize, DataTypes, ENUM } = require("sequelize");
const sequelize = require("./config");

const Option = sequelize.define("Option", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    option_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option_label: {
        type: DataTypes.ENUM('A', 'B', 'C', 'D', 'True', 'False'),
        allowNull: false,
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Option;