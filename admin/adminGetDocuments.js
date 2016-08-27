var admin = require('./admin');

module.exports = function(modelName, callback) {
    var model = admin[modelName];
    var formatedDocuments = {'documents': []};

    var getDocuments = new Promise( (resolve, reject) => {
        model.find({}, (err, documents) => {
            if (err) {
                return reject(err);
            } else {
                resolve(documents)
            };
        });
    });

    getDocuments.then( (documents) => {
        /*
            that will be sended to callback and it will be sommethin as
            { documents: [{relatedAdminName: 'username', id: '123456789'}]
            }
        */

        documents.forEach( (document, i) => {
            formatedDocuments.documents[i] = {
                'id': document._id,
                'relatedAdminName': document.relatedAdminName,
            }
        })

        callback(null, formatedDocuments)
    }).catch( (err) => {
        callback(err)
    });
};
