angular.module('index').directive('renderModels', function($http) {
    return {
        restrict: 'E',
        replace: false,
        templateUrl:'/admin/templates/models.html',
        // TODO get this http and put on a decent service !!
        controller: function($scope) {
            $http({
                url: '/admin/api/getmodels',
                method: 'GET'
            }).then(function successCallback(response) {
                $scope.models = response.data.models
            });
        }
    };
});
