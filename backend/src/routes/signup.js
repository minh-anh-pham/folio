const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const {body, validationResult} = require("express-validator");
const bcrypt = require('bcrypt');

router.post("/", body("email").isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    const {email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await User.create({email, password: hashedPassword});
    res.status(200).send({user});
})

module.exports = router;
