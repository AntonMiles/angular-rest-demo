var myApp = angular.module("myApp");

myApp.controller("albums", ["$scope", "$http", "AlbumsService", function ($scope, $http, AlbumsService) {
    $scope.albums = [];
    var fetchSuccess = function (result) {
        result.results.forEach(function (album) {
            $http.get(album.artist)
                .then(function (response) {
                    album.artist = response.data;
                });
            $scope.albums.push(album);
        })
    };
    var fetchError = function () {
        console.log("failure fetching Album data")
    };

    var tokenPromise = AlbumsService.get();
    tokenPromise.$promise
        .then(fetchSuccess, fetchError);
}]);

myApp.controller("users", ["$scope", "UsersService", function ($scope, UsersService) {
    $scope.users = [];
    var tokenPromise = UsersService.get();
    tokenPromise.$promise
        .then(function (result) {
            $scope.users = result.results;
        })
}]);

myApp.controller("github", ["$scope", "RepositoryService", function($scope, RepositoryService) {
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
}]);
