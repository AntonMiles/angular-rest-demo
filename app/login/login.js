'use strict';

angular.module('myApp.login', [
    'ngCookies',
    'ngResource'
])

/*Controllers*/
.controller('login', ['$scope', '$rootScope', '$cookies', '$base64', 'LoginService', function ($scope, $rootScope, $cookies, $base64, LoginService) {
    $scope.user = {};
    $scope.user.username = "";
    $scope.user.password = "";

    var loginError = function () {
        console.log("failure logging in")
    };
    var loginSuccess = function (result) {
        $cookies.put('authToken', result.token);
        $rootScope.loggedIn = true;
        $rootScope.jwtPayload = angular.fromJson($base64.decode($cookies.get('authToken').split(".")[1]));
    };
    $scope.login = function () {
        var credentials = {username: $scope.user.username, password: $scope.user.password};
        var tokenPromise = LoginService.authenticate(credentials);
        tokenPromise.$promise
            .then(loginSuccess, loginError);
    }
}])

/*Resources*/
.factory('LoginService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
    return $resource(
        apiUrl + 'auth/token/',
        {},
        {
            authenticate: {
                method: "POST"
            }
        }
    )
}]);