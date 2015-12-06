'use strict';

angular.module('myApp.users', [
    'ngResource'
])

/*Controllers*/
.controller("users", ["$scope", "UsersService", function ($scope, UsersService) {
    $scope.users = [];
    var tokenPromise = UsersService.get();
    tokenPromise.$promise
        .then(function (result) {
            $scope.users = result.results;
        })
}])

/*Resources*/
.factory('UsersService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
    return $resource(apiUrl + 'users/');
}]);
