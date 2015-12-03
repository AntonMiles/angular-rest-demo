var apiUrl = "http://127.0.0.1:8000/";
var myApp = angular.module("myApp");
var gitHubUrl = 'https://api.github.com/';


myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});


myApp.factory('AlbumsService', ['$resource', function ($resource) {
    return $resource(apiUrl + 'albums/');
}]);

myApp.factory('UsersService', ['$resource', function ($resource) {
    return $resource(apiUrl + 'users/');
}]);

myApp.factory('RepositoryService', ['$resource', function ($resource) {
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

myApp.factory('authInterceptor', ['$rootScope', '$q', '$cookies', function ($rootScope, $q, $cookies) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($cookies.get('authToken') && config.url.indexOf(apiUrl) !== -1) {
                config.headers.Authorization = 'JWT ' + $cookies.get('authToken');
            }
            return config;
        }
    };
}]);

