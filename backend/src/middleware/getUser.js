const User = require("../models/user.model");

async function getUser (req, res, next) {
    req.user = await User.findByPk(req.params.id);

    if (!req.user) {
        return res.sendStatus(404);
    }

    next();
}

module.exports = getUser;
