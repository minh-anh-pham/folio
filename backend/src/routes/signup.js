require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const {body, validationResult} = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", body("email").isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    const {email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    let {newId, newEmail} = await User.create({email, password: hashedPassword});

    const token = jwt.sign({newId, newEmail}, JWT_SECRET);

    res.status(200).send({message: "You're registered", token});
})

module.exports = router;
