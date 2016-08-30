var adminGetFields = require('../../../admin/adminGetFields');

module.exports = function(req, res, next) {
    var modelToGetFields = req.query.model;
    var idOfDocument = req.query.id;

    if (!modelToGetFields || !idOfDocument) {
        return res.status(400);
    };

    adminGetFields.existingDoc(modelToGetFields, idOfDocument, (err, fieldsList) => {
        if (err) {
            console.log(err);
            res.status(400);
        } else {
            res.status(200);
            res.json(fieldsList);
        };
    });
};
