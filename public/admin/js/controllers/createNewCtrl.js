angular.module('index')
    .controller('createNewCtrl', function($scope, $routeParams, $window, getFields, saveData) {
        $scope.modelData = {};
        $scope.model = $routeParams.model;
        $scope.errorOnSave;
        $scope.successOnSave;

        getFields($scope.model, function(err, response) {
            if (err) return $window.location.href = '/admin'

            $scope.modelData.fields = response.data
            console.log(response);
        });

        $scope.saveNew = function(_data) {
            var _model = $scope.model;

            saveData.send(_model, null, _data)
                .then(function successCallback(response) {
                    $scope.errorOnSave = null;
                    $scope.successOnSave = response.data;
                }, function errorCallback(response) {
                    $scope.errorOnSave = response.data;
                    $scope.successOnSave = null;
                })
        }

    });
