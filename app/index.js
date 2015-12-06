'use strict';

angular.module('myApp.index', [
    'ngCookies',
    'base64'
])

/*Controllers*/
.controller('index', ['$scope', '$rootScope', '$cookies', '$base64', function($scope, $rootScope, $cookies, $base64) {
    $rootScope.$watch('loggedIn', function(newValue) {
        $scope.loggedIn = newValue;
    });
    $rootScope.$watch('jwtPayload', function(newValue) {
        if (newValue)
            $scope.username = newValue.username;
    });
    if ($cookies.get('authToken')) {
        $rootScope.jwtPayload = angular.fromJson($base64.decode($cookies.get('authToken').split(".")[1]));
        $rootScope.username = $rootScope.jwtPayload.username;
        $rootScope.loggedIn = true;
    }
}]);