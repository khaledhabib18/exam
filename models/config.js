const { Sequelize } = require("sequelize");
require("dotenv").config();

const databaseUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize(databaseUrl, {
    logging: false,
    dialectModule: require('pg')
});

module.exports = sequelize;