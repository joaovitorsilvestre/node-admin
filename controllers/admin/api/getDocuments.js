var adminGetDocuments = require('../../../admin/adminGetDocuments');

module.exports = function(req, res, next) {
    var modelName = req.query.model;

    if (!modelName) return res.status(400);

    adminGetDocuments(modelName, (err, documents) => {
        if (err) return res.status(400);

        if (documents) {
            res.status(200).json(documents);
        };
    });
};
