var adminSaveData = require('../../../admin/adminSaveData');

module.exports = function(req, res, next) {
    var dataToSave = req.body;

    adminSaveData(dataToSave, (err) => {
        if (err) {
            if (err.code == 11000){
                // use regex to get the field that error ocours
                var fieldError = err.message.match(/\$(.*?)_/);
                res.status(401).json({
                    error: fieldError[1] + " field must be unique."
                });
            } else {
                res.json({error: 'Internal error'});
            }
        } else {
            res.json({statusMsg: 'Success'}).status(201);
        };
    });
};
