const {Sequelize} = require("sequelize");
const path = require("path");
const sqlite3 = require("sqlite3");

const db = new Sequelize({
    dialect: 'sqlite',
    dialectModule: sqlite3,
    storage: path.join(__dirname, "db.sqlite"),
    logging: false
});

module.exports = db;
