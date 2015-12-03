'use strict';

angular.module('myApp.index', [
    'ui.router',
    'ngCookies',
    'base64'
])

/*Controllers*/
.controller('index', ['$scope', '$cookies', '$base64', function($scope, $cookies, $base64) {
    $scope.username = "";
    if ($cookies.get('authToken')) {
        var jwtPayload = angular.fromJson($base64.decode($cookies.get('authToken').split(".")[1]));
        $scope.username = jwtPayload.username;
        $scope.loggedIn = true;
    }
    else
        $scope.loggedIn = false;
}]);