const {Model, DataTypes} = require("sequelize");
const db = require("../db/db");

class User extends Model {

}

User.init({
    id: {type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }}, {sequelize: db})

module.exports = User;
