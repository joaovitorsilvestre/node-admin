angular.module('index').directive('formateFields', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            formatType: "="
        },
        link: function(scope, element, attrs, ctrl) {
            element.bind('keyup', function() {
                console.log(scope.formaType);
            });
        }
    };
});
