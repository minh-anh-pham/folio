const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");
const getBook = require("../middleware/getBook");

router.get("/", async (req, res) => {
    const allBooks = await Book.findAll();
    res.status(200).send({allBooks});
})

router.get("/:id", getBook, async (req, res) => {
    res.status(200).send({book: req.book});
})

router.post("/", async (req, res) => {
    const book = await Book.create(req.body);
    res.status(200).send({book});
})

router.put("/:id", getBook, async (req, res) => {
    await req.book.update(req.body);
    res.status(200).send({book: req.book});
})

router.delete("/:id", getBook, async (req, res) => {
    await req.book.destroy();
    res.status(200).send({book: req.book});
})

module.exports = router;
