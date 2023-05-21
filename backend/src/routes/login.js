const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    const {email, password} = req.body;

    const where = {};

    if (email) where.email = email;

    const user = await User.findOne({where});

    if (user === null) {
        res.status(404).send("Email not registered, please sign up");
    }

    if (user !== null && password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.status(200).send("Successfully logged in");
        } else {
            res.status(401).send("Wrong password");
        }
    }
})

module.exports = router;
