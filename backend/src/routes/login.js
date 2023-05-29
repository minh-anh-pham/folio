require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
    const {email, password} = req.body;

    const where = {};

    if (email) where.email = email;

    const foundUser = await User.findOne({where});

    if (foundUser === null) {
        res.status(404).send({message: "Email not registered, please sign up"});
    }

    const foundUserId = foundUser.id;
    const foundUserEmail = foundUser.email;
    const foundUserPassword = foundUser.password;

    if (foundUser !== null && password) {
        const isMatch = await bcrypt.compare(password, foundUserPassword);

        if (isMatch) {
            const token = jwt.sign({foundUserId, foundUserEmail}, JWT_SECRET);

            return res.status(200).send({message: "Successfully logged in", token, user: foundUser});
        } else {
            return res.status(401).send({message: "Wrong password"});
        }
    }
})

module.exports = router;
