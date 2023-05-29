const express = require("express");
const router = express.Router();
const Progress = require("../models/progress.model");
const User = require("../models/user.model");
const Book = require("../models/book.model");

router.get("/", async (req, res) => {

    const {currentUserId} = req.query;

    const progresses = await Progress.findAll({where: {userId: currentUserId}});

    let books = [];

    const response = await Promise.all(
        progresses.map(async (progress) => {
            return await Book.findByPk(progress.bookId)
        })
    );

    books = books.concat(response);

    return res.status(200).send({progresses, books});
});

module.exports = router;
