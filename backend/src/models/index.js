const User = require("./user.model");
const Book = require("./book.model");
const Progress = require("./progress.model");

Book.belongsToMany(User, {through: Progress});
User.belongsToMany(Book, {through: 'User_Book'});

module.exports = {
    User,
    Book,
    Progress
}
