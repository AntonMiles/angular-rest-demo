'use strict';

angular.module('myApp.github', [
    'ngResource'
])

/*Controllers*/
.controller("github", ["$scope", "RepositoryService", function($scope, RepositoryService) {
    $scope.githubUsername = "";
    $scope.repos = [];

    var fetchSuccess = function(result) {
        $scope.repos = result;
        console.log($scope.repos)
    };
    var fetchError = function() {
        console.log("Unable to fetch repos for " + $scope.githubUsername)
    };

    $scope.search = function() {
        var username = {githubUsername: $scope.githubUsername};
        var tokenPromise = RepositoryService.getRepos(username);
        tokenPromise.$promise
            .then(fetchSuccess, fetchError);
    }
}])

/*Resources*/
.factory('RepositoryService', ['$resource', 'gitHubUrl', function ($resource, gitHubUrl) {
    return $resource(
        gitHubUrl + 'users/:githubUsername/repos',
        {},
        {
            getRepos: {
                method: "GET",
                isArray: true
            }
        }
    );
}]);