var appModule = angular.module("appICSS", ['ngRoute', 'routeControllers']);

appModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/base', {
        templateUrl: 'app/module/base.html',
        controller: ''
    }).
    when('/dev', {
        templateUrl: 'app/module/developing.html',
        controller: ''
    }).
    when('/base1', {
        templateUrl: 'app/module/base1.html',
        controller: ''
    }).
    when('/base2', {
        templateUrl: 'app/module/base2.html',
        controller: ''
    }).
    when('/menu', {
        templateUrl: 'app/module/menu/index.html',
        controller: 'MenuController'
    }).
    when('/user', {
        templateUrl: 'app/module/user/index.html',
        controller: 'UserController'
    }).
    when('/user/:userId', {
        //userId - variable from URL
        templateUrl: 'app/module/user/details.html',
        controller: 'UserDetailsController'
    }).
    when('/message/:messageId', {
        templateUrl: 'app/module/message/details.html',
        controller: 'MessageDetailController'
    }).
    otherwise({
        redirectTo: '/base'
    });
}]);