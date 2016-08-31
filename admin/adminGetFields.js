var admin = require('./admin');

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

        var fieldsOptions = (fieldsObject[_name].options);

        fieldsFormated[_name] = fieldsOptions;
        fieldsFormated[_name]['name'] = _name;
        fieldsFormated[_name]['value'] = null;
        fieldsFormated[_name]['typeFormat'] = fieldsOptions.type.name;
    });
    return fieldsFormated;
};

module.exports.existingDoc = function(modelName, id, callback) {
    var modelCompiled = admin[modelName];

    if (modelCompiled) {
        modelFields = getModelFields(modelCompiled);

        getFieldsValues(modelCompiled, id, modelFields, (err, fieldsValues) =>{
            if (err) return callback(err);

            callback(null, fieldsValues);
        });
    } else {
        var error = new Error('This model doenst exist');
        return callback(error);
    };

    function getFieldsValues(model, id, fieldsAlreadyFormated, callback) {
        var documentFind = new Promise( (resolve, reject) => {
            model.findById(id, (_err, _document) => {
                if (_err) reject(_err);

                if (_document) {
                    resolve(_document);
                } else {
                    reject(new Error('Document doesnt exists.'));
                };
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

module.exports.onlyFields = function(modelName, callback) {
    var modelCompiled = admin[modelName];

    if (modelName) {
        return callback(null, getModelFields(modelCompiled));
    } else {
        var error = new Error('This model doenst exist');
        return callback(error);
    };
};
