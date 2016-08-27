angular.module('index').factory('getDocuments', function($http) {
    var makeRequestToDocuments = function(modelName, callback) {
        $http({
            url: "/admin/api/getdocuments",
            method: "get",
            params: {model: modelName}
        }).then( function successCallback(response) {
            callback(null, response)
        }, function errorCallback(response) {
            callback(response);
        })
    };

    return makeRequestToDocuments;
});
