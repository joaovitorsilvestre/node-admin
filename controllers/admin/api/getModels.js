var adminGetModels = require('../../../admin/adminGetModels');

module.exports = function(req, res, next) {
    var models = adminGetModels();

    res.status(200);
    res.json({models: models});
};
