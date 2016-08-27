angular.module('index')
    .controller('displayDocuments', function($scope, $routeParams, getDocuments) {
        $scope.model = $routeParams.model;

        getDocuments($scope.model, function(err, response) {
            if (err) return console.log(err);

            $scope.documentsToDisplay = response.data.documents;
        })
    });
