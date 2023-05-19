const Progress = require("../models/progress.model");

async function getProgress (req, res, next) {
    req.progress = await Progress.findByPk(req.params.id);

    if (!req.progress) {
        return res.sendStatus(404);
    }

    next();
}

module.exports = getProgress;
