const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./config");

const Attempt = sequelize.define("Attempt", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    started_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    finished_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    examId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},
    {
        indexes: [
            {
                unique: true,
                fields: ['userId', 'examId']
            }
        ]
    });

module.exports = Attempt;