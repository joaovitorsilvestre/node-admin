angular.module('index').factory('getDocumentToEdit', function($http) {
    var makeRequestToFieldsAndValues = function(modelName, docId ,callback) {
        $http({
            url: '/admin/api/getdocumenttoedit',
            method: 'GET',
            params: {
                model: modelName,
                id: docId
            }
        }).then(function successCallback(response) {
            callback(null, response)
        }, function errorCallback(response) {
            callback(response)
        });
    }

    return makeRequestToFieldsAndValues;
});
