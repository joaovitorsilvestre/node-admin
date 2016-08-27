var mongoose = require('mongoose');

var admin = require('./admin');

module.exports = function(dataToSave, callback) {
    var modelName = dataToSave.model;
    var id = dataToSave.id
    var data = dataToSave.data;

    var dataFormated = {};

    // simplify to be as {username: 'valueFromFront', password='passTest'}
    for (var field in data) {
        var value = data[field]['value'];

        if (value) {
            dataFormated[field] = value
        };
    };

    // saving the data to database
    var Model = admin[modelName];

    if (Model) {
        if (id) {
            // if is to edit an existing document...
            updateDocument(Model, dataFormated, (err) => {
                if (err) return callback(err);

                callback();
            })
        } else {
            // if not, create a new
            var newObject = new Model(dataFormated);

            newObject.save(callback);
        }

    } else {
        var error = new Error("Model doesn't exists");
        return callback(error);
    };

    function updateDocument(_model, _dataFormated, callback) {
        _model.findById(id, (err, _document) => {
            if (err) return callback(err);

            if (_document) {
                for (var field in _dataFormated) {
                    _document[field] = _dataFormated[field]
                };
                _document.save(callback);
            } else {
                callback(new Error('Document doesnt exists'))
            };
        });
    };
};
