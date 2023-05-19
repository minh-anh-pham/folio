const express = require("express");
const router = express.Router();
const Progress = require("../models/progress.model");
const getProgress = require("../middleware/getProgress");
const {body, validationResult} = require("express-validator");
const { Book } = require("../models");

router.get("/", async (req, res) => {
    const allProgresses = await Progress.findAll({
        include: {all: true}
      });
    res.status(200).send({allProgresses});
})

router.get("/:id", getProgress, async (req, res) => {
    res.status(200).send({progress: req.progress});
})

router.post("/", body("currentPage").isNumeric(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }
    const progress = await Progress.create(req.body);
    res.status(200).send({progress});
})

router.put("/:id", getProgress, body("currentPage").isNumeric(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }
    await req.progress.update(req.body);
    res.status(200).send({progress: req.progress});
})

router.delete("/:id", getProgress, async (req, res) => {
    await req.progress.destroy();
    res.status(200).send({progress: req.progress});
})

module.exports = router;
