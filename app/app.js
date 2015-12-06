'use strict';

/*Used to set the cookie to expire at the same time as the JWT*/
var cookieDate = new Date();
cookieDate.setMinutes(cookieDate.getMinutes() + 60);

angular.module("myApp", [
        'ui.router',
        'ngResource',
        'ngCookies',
        'base64',
        'myApp.index',
        'myApp.login',
        'myApp.github',
        'myApp.albums',
        'myApp.users'
    ])

    /*State Management*/
    .config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('base', {
                abstract: true,
                views: {
                    '@': {
                        templateUrl: '/partials/body.html',
                        controller: 'index'
                    },
                    'login@base': {
                        templateUrl: '/login/login.html',
                        controller: 'login'
                    },
                    'header@base': {
                        templateUrl: '/partials/header.html'
                    },
                    'content@base': {
                        templateUrl: '/partials/data.html'
                    }
                }
            })
            .state('base.home', {
                url: '^/home'

            })
            .state('base.albums', {
                url: '^/albums',
                views: {
                    'albums@base': {
                        templateUrl: '/albums/albums.html',
                        controller: 'albums'
                    }
                }
            })
            .state('base.users', {
                url: '^/users',
                views: {
                    'users@base': {
                        templateUrl: '/users/users.html',
                        controller: 'users'
                    }
                }
            })
            .state('base.github', {
                url: '^/github',
                views: {
                    'github@base': {
                        templateUrl: '/github/github.html',
                        controller: 'github'
                    }
                }
            })
            .state('base.all', {
                url: '^/all',
                views: {
                    'users@base': {
                        templateUrl: '/users/users.html',
                        controller: 'users'
                    },
                    'albums@base': {
                        templateUrl: '/albums/albums.html',
                        controller: "albums"
                    },
                    'github@base': {
                        templateUrl: '/github/github.html',
                        controller: 'github'
                    }
                }
            })
    }])

    /*Constants*/
    .constant('apiUrl', 'http://127.0.0.1:8000/')
    .constant('gitHubUrl', 'https://api.github.com/')

    /*Configurations*/
    .config(['$resourceProvider', function ($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }])
    .config(['$cookiesProvider', function ($cookiesProvider) {
        $cookiesProvider.defaults.secure = false;
        //$cookiesProvider.defaults.httpOnly = true;
        $cookiesProvider.defaults.expires = cookieDate;
    }])

    /*Authentication Interceptor*/
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])
    .factory('authInterceptor', ['$rootScope', '$q', '$cookies', 'apiUrl', function ($rootScope, $q, $cookies, apiUrl) {
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
