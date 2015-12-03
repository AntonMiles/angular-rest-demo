'use strict';

angular.module('myApp.login', [
    'ui.router',
    'ngCookies',
    'ngResource'

])

/*Controllers*/
.controller('login', ['$scope', '$cookies', 'LoginService', 'VerifyJWTService', function ($scope, $cookies, LoginService, VerifyJWTService) {
    $scope.user = {};
    $scope.user.username = "";
    $scope.user.password = "";


    var loginError = function () {
        console.log("failure logging in")
    };
    var loginSuccess = function (result) {
        var token = {"token": result.token};
        var verifyJWTToken = VerifyJWTService.verify(token);
        verifyJWTToken.$promise
            .then(tokenSuccess, tokenError);
        $cookies.put('authToken', result.token);
        $scope.user.loggedIn = true;
    };
    var tokenSuccess = function (result) {
    };
    var tokenError = function () {
        console.log("Unable to verify token signature")
    };

    $scope.login = function () {
        var credentials = {username: $scope.user.username, password: $scope.user.password};
        var tokenPromise = LoginService.authenticate(credentials);
        tokenPromise.$promise
            .then(loginSuccess, loginError);
    }
}])

/*Resources*/
.factory('LoginService', ['$resource', function ($resource) {
    return $resource(
        apiUrl + 'auth/token/',
        {},
        {
            authenticate: {
                method: "POST"
            }
        }
    )
}])
.factory('VerifyJWTService', ['$resource', function ($resource) {
    return $resource(
        apiUrl + 'auth/verify/',
        {},
        {
            verify: {
                method: "POST"
            }
        }
    )
}]);