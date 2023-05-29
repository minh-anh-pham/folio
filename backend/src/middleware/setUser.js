const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');

const setUser = async (req, res, next) => {
    const auth = req.header("Authorization");

    if (!auth) {
        next();
    } else {
        const [, token] = auth.split(" ");

        const userObj = jwt.verify(token, JWT_SECRET);

        const userId = JSON.stringify(userObj.foundUserId);

        const user = await User.findByPk(userId);

        req.user = user;

        next();
    }
}

module.exports = setUser;
