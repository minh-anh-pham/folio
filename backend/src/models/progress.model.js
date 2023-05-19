const {Model, DataTypes} = require("sequelize");
const db = require("../db/db");

class Progress extends Model {

}

Progress.init({
    id:
        {type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},
    currentPage: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {sequelize: db})

module.exports = Progress;
