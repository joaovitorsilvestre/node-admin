angular.module('index').factory('saveData', function($http) {
    this.send = function(model, id, data) {
        return $http({
            url: '/admin/api/savedata',
            method: 'POST',
            data: {
                model: model,
                id: id,
                data: data
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
    };

    return this;

});
