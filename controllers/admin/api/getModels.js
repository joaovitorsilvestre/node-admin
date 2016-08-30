var adminGetModels = require('../../../admin/adminGetModels');

module.exports = function(req, res, next) {
    var models = adminGetModels();

    if (!models) return res.status(400);

    res.status(200);
    res.json({models: models});
};
