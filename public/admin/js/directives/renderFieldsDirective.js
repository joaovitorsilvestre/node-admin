angular.module('index').directive('renderFields', function() {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: '/admin/templates/fields.html',
        scope: {
            fields: '=',
            submitButtonText: '@',
            onSubmitForm: '&'
        },
        controller: function($scope) {
            $scope.sendData = $scope.onSubmitForm();
        }
    };
});
