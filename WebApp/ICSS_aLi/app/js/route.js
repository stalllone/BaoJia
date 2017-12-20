var appModule = angular.module("appModule", ['ngRoute', 'demoControllers']);

appModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/user', {
        templateUrl: 'App/Views/NgUser.html',
        controller: 'UserController'
    }).
    when('/user/:userId', {
        //userId - variable from URL
        templateUrl: 'App/Views/NgUserDetail.html',
        controller: 'MessageController'
    }).
    when('/message/:messageId', {
        templateUrl: 'App/Views/NgMessageDetails.html',
        controller: 'MessageDetailController'
    }).
    otherwise({
        redirectTo: '/user'
    });
}]);