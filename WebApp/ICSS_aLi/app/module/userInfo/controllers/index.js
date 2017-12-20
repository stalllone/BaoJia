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