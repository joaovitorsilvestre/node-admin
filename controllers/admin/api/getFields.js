var adminGetFields = require('../../../admin/adminGetFields');

module.exports = function(req, res, next) {
    var modelToGetFields = req.query.model;

    adminGetFields( modelToGetFields, null, (err, fieldsList) => {
        if (err) {
            res.status(400);
        } else {
            res.set({'ETag': '1'}); //avoid 304-not modified
            res.json(fieldsList);
        };
    });
};
