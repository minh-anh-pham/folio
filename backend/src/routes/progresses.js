const express = require("express");
const router = express.Router();
const Progress = require("../models/progress.model");
const getProgress = require("../middleware/getProgress");
const setUser = require("../middleware/setUser");
const {body, validationResult} = require("express-validator");

router.get("/", setUser, async (req, res) => {
    const {currentUserId, currentBookId} = req.query;

    const where = {};

    if (currentUserId) {where.userId = currentUserId;};

    if (currentBookId) {where.bookId = currentBookId;};

    const progresses = await Progress.findAll({where});
    console.log(progresses);

    if (progresses.length !== 0) {
        console.log("inside progress");
        return res.status(200).send({message: "Progress: ", progresses});
    } else {
        console.log("inside no progress");
        return res.send({message: "Progress doesn't exist"});
    }
})

router.get("/:id", getProgress, async (req, res) => {
    res.status(200).send({progress: req.progress});
})

router.post("/", body("currentPage").isNumeric(), setUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    let userId = 0;

    if (!req.user) {
        return res.status(401).send({message: "You are not authorised, please log in first"});
    } else {
        userId = req.user.id;
    }

    const {currentPage, bookId} = req.body;

    const progress = await Progress.create({currentPage, bookId, userId});

    return res.status(200).send({message: "Bookmark created, please go to your personal page to view", progress});
})

router.put("/:id", setUser, getProgress, body("currentPage").isNumeric(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    const {currentPage} = req.body;

    await req.progress.update({currentPage: currentPage});
    res.status(200).send({message: "Bookmark updated, please go to your personal page to view", progress: req.progress});
})

router.delete("/:id", setUser, getProgress, async (req, res) => {
    await req.progress.destroy();
    res.status(200).send({message: "Bookmark deleted", progress: req.progress});
})

module.exports = router;
