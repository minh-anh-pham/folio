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
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {sequelize: db})

module.exports = Progress;
