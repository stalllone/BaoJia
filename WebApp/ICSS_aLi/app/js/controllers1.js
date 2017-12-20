
var routeControllers = angular.module("routeControllers", ['routeServices', 'routeFilters']);

routeControllers.controller("HomeController", ["$scope", "$http", function ($scope, $http) {
    //debugger
    $scope.pageHeading = 'this is page title.';
    $http.get('/service/getmessages')
        .success(function (data) {
            $scope.messages = data;
        })
    .error(function () {
        alert("some error");
    });
}]);

routeControllers.controller("MessageController", ["$scope", "$http", function ($scope, $http) {
    //debugger
    $scope.orderMsg = 'subject';

    $scope.pageHeading = 'this is page title.';
    $http.get('/service/GetMessageDetail')
        .success(function (data) {
            $scope.messages = data;
        })
    .error(function () {
        alert("some error");
    });
}]);

routeControllers.controller("MessageDetailController", ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
    var messages;
    $scope.orderMsg = 'sender';

    var urlID = $routeParams.messageId;
    $scope.pageHeading = $routeParams.messageId;
    $http.get('/service/GetMessageDetail/'+urlID)
        .success(function (data) {
            //debugger
            $scope.details = data.data;
        
        })
    .error(function () {
        alert("some error");
    });
}]);

routeControllers.controller("UserController", ["$scope", "UserService", function ($scope, UserService) {
    //debugger
    $scope.pageHeading = 'behold the majesty of your page title';
    $scope.users = [];
    UserService.GetAllUsers().then(function (data) {
        //debugger
        $scope.users = data.data;
    });

    UserService.GetUserDetail(2).then(
     function (data) {
         //debugger
         $scope.users.push(data.data);
     });

    //$scope.phone = User.get({ id: 3 }, function (phone) {
    //    //debugger
    //});

    // $http.get('/service/GetUserDetail' + "?id=2")
    //    .success(function (data) {
    //        //$scope.users = data;
    //    })
    // .error(function () {
    //    alert("some error11");
    // });

    $scope.AddUser = function () {
        //debugger
        /*
        var newUserName = $scope.newUser.name;
        if (newUserName.indexOf(" ") != -1) {
            alert("invalid " + newUserName.indexOf(" "));
        }
        */
        console.log($scope.newUser.name);
        console.log($scope.newUser.email);
        alert("User Added");
        //$scope.users = [];
        //service call to save it to db
        $scope.users.push({ name: $scope.newUser.name, email: $scope.newUser.email });
        $scope.newUser.name = "";
        $scope.newUser.email = "";
    }
}]);

routeControllers.controller("UserDetailsController", ["$scope", "UserService", function ($scope, UserService) {
    UserService.GetUserDetail(2).then(
     function (data) {
         //debugger
         $scope.messages = data.data.messages;
     });
}]);

routeControllers.controller("TempController", ["$scope", "$http", function ($scope, $http) {
    //debugger
    $scope.pageHeading = 'this is message from tempcontroller.';

}]);