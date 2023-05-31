const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const getUser = require("../middleware/getUser");
const {body, validationResult} = require("express-validator");
const bcrypt = require('bcrypt');
const setUser = require("../middleware/setUser");

router.get("/", setUser, async (req, res) => {
    if (!req.user) {
        return res.status(401).send({message: "You are not authorised, please log in first"});
    } else if (req.user.role !== "admin") {
        return res.status(401).send({message: "You are not authorised to access this endpoint"});
    }

    const allUsers = await User.findAll();

    res.status(200).send({allUsers});
})

router.get("/:id", setUser, getUser, async (req, res) => {
    if (!req.user) {
        return res.status(401).send({message: "You are not authorised, please log in first"});
    } else if (req.user.role !== "admin") {
        return res.status(401).send({message: "You are not authorised to access this endpoint"});
    }

    res.status(200).send({user: req.user});
})

router.post("/", body("email").isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    const {email, password} = req.body;

    const user = await User.create({email, password});

    res.status(200).send({user});
})

router.put("/:id", getUser, body("email").isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }
    await req.user.update(req.body);
    res.status(200).send({user: req.user});
})

router.delete("/:id", getUser, async (req, res) => {
    await req.user.destroy();
    res.status(200).send({user: req.user});
})

module.exports = router;
