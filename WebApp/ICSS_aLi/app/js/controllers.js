var routeControllers = angular.module("routeControllers", ['routeServices', 'routeFilters']);

routeControllers.controller("HomeController", ["$scope", "$http", function($scope, $http) {
    //debugger
    $scope.pageHeading = 'this is page title.';
    $http.get('/service/getmessages')
        .success(function(data) {
            $scope.messages = data;
        })
        .error(function() {
            alert("some error");
        });
}]);

routeControllers.controller("MessageController", ["$scope", "$http", function($scope, $http) {
    //debugger
    $scope.orderMsg = 'subject';

    $scope.pageHeading = 'this is page title.';
    $http.get('/service/GetMessageDetail')
        .success(function(data) {
            $scope.messages = data;
        })
        .error(function() {
            alert("some error");
        });
}]);

routeControllers.controller("MessageDetailController", ["$scope", "$routeParams", "$http", function($scope, $routeParams, $http) {
    var messages;
    $scope.orderMsg = 'sender';

    var urlID = $routeParams.messageId;
    $scope.pageHeading = $routeParams.messageId;
    $http.get('/service/GetMessageDetail/' + urlID)
        .success(function(data) {
            //debugger
            $scope.details = data.data;

        })
        .error(function() {
            alert("some error");
        });
}]);

routeControllers.controller("UserController", ["$scope", "UserService", function($scope, UserService) {
    //debugger
    $scope.pageHeading = 'behold the majesty of your page title';
    $scope.users = [];
    UserService.GetAllUsers().then(function(data) {
        //debugger
        $scope.users = data.data;
    });

    UserService.GetUserDetail(2).then(
        function(data) {
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

    $scope.AddUser = function() {
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

routeControllers.controller("UserDetailsController", ["$scope", "UserService", function($scope, UserService) {
    UserService.GetUserDetail(2).then(
        function(data) {
            //debugger
            $scope.messages = data.data.messages;
        });
}]);

routeControllers.controller("MenuController", ["$scope", "MenuService", function($scope, UserService) {
    UserService.GetAll().then(
        function(data) {
            //debugger
            if (!data.result) {
                alert('未能取得后台数据');
            }
            var setting = {
                view:{
                    showIcon:false
                },
                edit: {
                    enable: true,
                    showRemoveBtn: showRemoveBtn,
                    showRenameBtn:false,
                    removeTitle: "删除该功能",
                    renameTitle: "编辑该功能"
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    beforeDrag: beforeDrag,
                    beforeRemove: beforeRemove,
                    beforeRename: beforeRename,
                    onRemove: onRemove
                }
            };


            var settingSel = {
                view:{
                    showIcon:false
                },
                edit: {
                    enable: false,
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                }
            };


            
            var zTree ,zTreeSle;
            var zNodes = data.data;
            function beforeDrag(treeId, treeNodes) {
                for (var i = 0, l = treeNodes.length; i < l; i++) {
                    if (treeNodes[i].isParent) {
                        alert("你不能拖动一个父节点");
                        return false;
                    }
                }
                return true;
            }

            function showRemoveBtn(treeId, treeNode) {
                return !treeNode.isParent;
            }   

            function beforeRemove(treeId, treeNode) {
                if (treeNode.isParent) {
                    alert("你不能删除一个父节点");
                    return false;
                }
                return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
            }

            function onRemove(e, treeId, treeNode) {
                alert("后台删除操作");
            }

            function beforeRename(treeId, treeNode) {
                $("#divAct").show();
               return false;
            }

            $(document).ready(function() {
               zTree =  $.fn.zTree.init($("#treeDemo"), setting, zNodes);
               zTreeSle =  $.fn.zTree.init($("#treeSel"), settingSel, zNodes);
               zTree.expandAll(true);
               $("#menuBtn").bind('click', function(event) {
                   $("#treeSelDiv").fadeIn();
               });                
            });
            //-->
            $scope.messages = data.data.messages;
        });
}]);

routeControllers.controller("TempController", ["$scope", "$http", function($scope, $http) {
    //debugger
    $scope.pageHeading = 'this is message from tempcontroller.';

}]);