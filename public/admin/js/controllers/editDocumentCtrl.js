angular.module('index')
    .controller('editDocument', function($scope, $routeParams, getDocumentToEdit, saveData) {
        $scope.modelData = {};
        $scope.errorOnSave;
        $scope.successOnSave;
        var model = $routeParams.model;
        var id = $routeParams.id;

        getDocumentToEdit(model, id, function(err, response) {
            if (err) return console.log(err);

            $scope.modelData.fieldsWithValues = response.data;
        });

        $scope.saveEdited = function(fields) {
            var _model = model;
            var _id = id;

            saveData.send(_model, _id, fields)
                .then(function successCallback(response) {
                    $scope.errorOnSave = null;
                    $scope.successOnSave = response.data;
                }, function errorCallback(response) {
                    $scope.errorOnSave = response.data;
                    $scope.successOnSave = null;
                })
        };

    });
