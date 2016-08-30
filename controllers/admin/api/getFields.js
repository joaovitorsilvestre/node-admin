var adminGetFields = require('../../../admin/adminGetFields');

module.exports = function(req, res, next) {
    var modelToGetFields = req.query.model;

    if (!modelToGetFields) return res.status(400);

    adminGetFields.onlyFields(modelToGetFields, (err, fieldsList) => {
        if (err) {
            res.status(400);
        } else {
            res.json(fieldsList);
        };
    });
};
