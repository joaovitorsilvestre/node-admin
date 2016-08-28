var adminGetFields = require('../../../admin/adminGetFields');

module.exports = function(req, res, next) {
    var modelToGetFields = req.query.model;

    adminGetFields( modelToGetFields, null, (err, fieldsList) => {
        if (err) {
            res.status(400);
        } else {
            res.json(fieldsList);
        };
    });
};
