/**
 * Created by anton on 10/21/15.
 */

var apiUrl = "http://127.0.0.1:8000/";

var myApp = angular.module("myApp");
myApp.controller("albums", ["$scope", "$http", function($scope, $http) {
    $scope.albums = [];
    $scope.orderByVar = 'release_year';
    $http.get(apiUrl + "albums")
        .then(function(response) {
            response.data.results.forEach(function(album) {
                $http.get(album.artist)
                    .then(function(response) {
                        album.artist = response.data;
                    });
                $scope.albums.push(album);
            })
        });
  }]
);

myApp.controller("users", ["$scope", "$http", function($scope, $http) {
    $scope.users = [];
    $http.get(apiUrl + "users")
        .then(function(response) {
            $scope.users = response.data.results;
        })
}]);