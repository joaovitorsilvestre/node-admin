var admin = require('./admin');

module.exports = function(model, documentId, callback) {
    var modelToGetFields = admin[model];

    // verify if the model that is to get fields is registred in admin.js
    if (modelToGetFields) {
        var fields = getModelFields(modelToGetFields);

        if (documentId) {
            // return with the fields values of the existing document
            addValues(modelToGetFields, documentId, fields, (_err, _fields) => {
                if (_err) return callback(_err);

                callback(null, fields)
            })
        } else {
            // return normal without values
            return callback(null, fields);
        }

    } else {
        var error = new Error('This model doenst exist')
        return callback(error);
    }

    function getModelFields(model) {
        /*
        that will be sended to callback and it will be sommethin as
            {   username : {name: username, require:true, unique:true}},
                password : {name: password, require:true}
            }
        */

        var fieldsObject = model.schema.paths;
        var fieldsNames = Object.keys(fieldsObject);
        var fieldsFormated = {};

        // put in the fieldsFormated thigs that angular will use to verify
        // if the input is required for instance
        fieldsNames.forEach( (_name) => {
            if (_name == '_id' || _name == 'SchemaNumber'
                || _name == '__v' || _name == 'relatedAdminName') return;

            fieldsFormated[_name] = fieldsObject[_name].options;
            fieldsFormated[_name]['name'] = _name;
        });

        return fieldsFormated;
    };

    function addValues(model, id, fieldsAlreadyFormated, callback) {
        var documentFind = new Promise( (resolve, reject) => {
            model.findById(id, (_err, _document) => {
                if (_err) reject(_err);

                if (_document) {
                    resolve(_document);
                } else {
                    reject(new Error('Document doesnt exists.'))
                }
            });
        });

        documentFind.then( (_document) => {
            var _document = _document.toObject();

            for (var key in fieldsAlreadyFormated) {
                fieldsAlreadyFormated[key]['value'] = _document[key];
            };

            callback(null, fieldsAlreadyFormated);

        }).catch( (_err) => {
            callback(_err);
        });
    };
};
