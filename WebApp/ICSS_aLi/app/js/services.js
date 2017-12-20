﻿/// <reference path="../Angular/angular/angular.js" />
/// <reference path="../Angular/angular-resource/angular-resource.js" />

var routeServices = angular.module("routeServices", []);

routeServices.factory("UserService", ["$http", "$q", function ($http, $q) {
    var serv = {};

    // Return public API.
    return ({
        GetAllUsers: GetAllUsers,
        GetUserDetail: GetUserDetail
        //removeFriend: removeFriend
    });

    function GetAllUsers() {
        //var req = $http.get('/service/getusers');
        var req = $http({
            method: "get",
            url: "/service/getusers"
        });

        return req.then(handleSuccess, handleError);
    }

    function GetUserDetail(id) {
        //var req = $http.get('/service/GetUserDetail', params:{ "id" : id});
        var req = $http({
            method: "post",
            url: "/service/GetUserDetail",
            dataType:'json',
            params: {
                id: id
            }
        });
        return req.then(handleSuccess, handleError);
    }


    // ---
    // PRIVATE METHODS.
    // ---


    // I transform the error response, unwrapping the application data from
    // the API response payload.
    function handleError(response) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            !angular.isObject(response.data) ||
            !response.data.message
            ) {

            return ($q.reject("An unknown error occurred."));

        }
        // Otherwise, use expected error message.
        //return ($q.reject(response.data.message));
        return ($q.reject("response.data.message error"));

    }

    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess(response) {
        return (response.data);
    }
}]);


routeServices.factory("MenuService", ["$http", "$q", function ($http, $q) {
    var serv = {};

    // Return public API.
    return ({
        GetAll: GetAll
    });

    function GetAll() {
        //var req = $http.get('/service/getusers');
        var req = $http({
            method: "get",
            url: "/service/getMenu"
        });

        return req.then(handleSuccess, handleError);
    }

    function GetMenuByID() {
        //var req = $http.get('/service/getusers');
        var req = $http({
            method: "post",
            url: "/service/getMenuByID",
            dataType:'json',
            params: {
                id: id
            }          
        });

        return req.then(handleSuccess, handleError);
    }

    function GetMenuByUser() {
        //var req = $http.get('/service/getusers');
        var req = $http({
            method: "post",
            url: "/service/getMenuByUser",
            dataType:'json',
            params: {
                userid: userid
            }          
        });

        return req.then(handleSuccess, handleError);
    }
    // ---
    // PRIVATE METHODS.
    // ---


    // I transform the error response, unwrapping the application data from
    // the API response payload.
    function handleError(response) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            !angular.isObject(response.data) ||
            !response.data.message
            ) {

            return ($q.reject("An unknown error occurred."));

        }
        // Otherwise, use expected error message.
        //return ($q.reject(response.data.message));
        return ($q.reject("response.data.message error"));

    }

    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess(response) {
        return (response.data);
    }
}]);

routeServices.factory('User', ['$resource',
  function ($resource) {
      return $resource('/service/getusers', {}, {
          query: { method: 'GET', params: { phoneId: 'phones' }, isArray: true }
      });
  }]);