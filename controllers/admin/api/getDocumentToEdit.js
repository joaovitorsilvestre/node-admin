var adminGetFields = require('../../../admin/adminGetFields');

module.exports = function(req, res, next) {
    var modelToGetFields = req.query.model;
    var idOfDocument = req.query.id;

    adminGetFields( modelToGetFields, idOfDocument, (err, fieldsList) => {
        if (err) {
            res.status(400).send(_err);
        } else {
            res.status(200);
            res.json(fieldsList);
        };
    });
};
