var myApp = angular.module("myApp");

myApp.controller("login", ['$scope', '$cookies', 'LoginService', 'VerifyJWTService', function ($scope, $cookies, LoginService, VerifyJWTService) {
    $scope.user = {};
    $scope.user.username = "";
    $scope.user.password = "";

    if ($cookies.get('authToken') === null)
        $scope.user.loggedIn = true;

    else
        $scope.user.loggedIn = false;

    var loginError = function () {
        alert("failure logging in")
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
        alert("Unable to verify token signature")
    };

    $scope.login = function () {
        var credentials = {username: $scope.user.username, password: $scope.user.password};
        var tokenPromise = LoginService.authenticate(credentials);
        tokenPromise.$promise
            .then(loginSuccess, loginError);
    }
}]);

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
        alert("failure logging in")
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

