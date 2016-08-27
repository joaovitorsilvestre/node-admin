angular.module('index').config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "/admin/views/index.html",
        controller: "indexCtrl"
    });

    $routeProvider.when("/createnew/:model", {
        templateUrl: "/admin/views/createNew.html",
        controller: "createNewCtrl"
    });

    $routeProvider.when("/displaydocuments/:model", {
        templateUrl: "/admin/views/displayDocuments.html",
        controller: "displayDocuments"
    });

    $routeProvider.when("/editdocument/:model/:id", {
        templateUrl: "/admin/views/editDocument.html",
        controller: "editDocument"
    })

    $routeProvider.otherwise({redirectTo: "/admin"})
});
