var adminGetFields = require('../../../admin/adminGetFields');

module.exports = function(req, res, next) {
    var modelName = req.query.model;

    if (!modelName) return res.status(400);

    adminGetFields.onlyFields(modelName, (err, fieldsList) => {
        if (err) {
            res.status(400);
        } else {
            res.setHeader('Cache-control', 'no-store');
            res.json(fieldsList);
        };
    });
};
