angular.module('index').factory('getFields', function($http) {
    var makeRequestToFields = function(modelName, callback) {
        $http({
            url: '/admin/api/getfields',
            method: 'GET',
            params: {model: modelName}
        }).then(function successCallback(response) {
            callback(null, response)
        }, function errorCallback(response) {
            callback(response)
        });
    }

    return makeRequestToFields;
});
