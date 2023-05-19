const {Model, DataTypes} = require("sequelize");
const db = require("../db/db");

class Book extends Model {

}

Book.init({
    id:
        {type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ISBN: {
        type: DataTypes.INTEGER
    },
    numOfPages: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    publisher: {
        type: DataTypes.TEXT
    },
    yearPublished: {
        type: DataTypes.INTEGER
    },
    cover: {
        type: DataTypes.TEXT
    },
    summary: {
        type: DataTypes.TEXT
    }
}, {sequelize: db})

module.exports = Book;
