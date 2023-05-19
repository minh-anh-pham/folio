const Book = require("../models/book.model");

async function getBook (req, res, next) {
    req.book = await Book.findByPk(req.params.id);

    if (!req.book) {
        return res.sendStatus(404);
    }

    next();
}

module.exports = getBook;
