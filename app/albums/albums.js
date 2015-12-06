'use strict';

angular.module('myApp.albums', [
    'ngResource'
])

/*Controllers*/
.controller("albums", ["$scope", "$http", "AlbumsService", function ($scope, $http, AlbumsService) {
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
}])

/*Resources*/
.factory('AlbumsService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
    return $resource(apiUrl + 'albums/');
}]);