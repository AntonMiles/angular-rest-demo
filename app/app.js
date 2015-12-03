'use strict';
var cookieDate = new Date();
cookieDate.setMinutes(cookieDate.getMinutes() + 60);

angular.module("myApp", [
        'ui.router',
        'ngResource',
        'ngCookies',
        'myApp.index',
        'myApp.login',
        'base64'
    ])
    .config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
        .state('base', {
            abstract: true,
            views: {
                '@': {
                    templateUrl: '/body/body.html',
                    controller: 'index'
                }
            }
        })
            .state('base.home', {
            url: '^/home',
            views: {
                'login@base': {
                    templateUrl: '/login/login.html',
                    controller: 'login'
                },
                'header@base': {
                    templateUrl: '/header/header.html',
                    controller: 'index'
                }
            }

        })
    }])
    .config(['$resourceProvider', function ($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }])
    .config(['$cookiesProvider', function ($cookiesProvider) {
        $cookiesProvider.defaults.secure = false;
        //$cookiesProvider.defaults.httpOnly = true;
        $cookiesProvider.defaults.expires = cookieDate;
    }]);


/*$stateProvider
            .state('home', {
                url: '^/home'
            })
            .state('data', {
                url: '^/data',
                abstract: true,
                views: {
                    '@': {
                        templateUrl: '/templates/data.html'
                    }
                }
            })
            .state('base.home.users', {
                url: '/users',
                views: {
                    'users@data': {
                        templateUrl: '/templates/users.html',
                        controller: 'users'
                    }
                }
            })
            .state('data.albums', {
                url: '/albums',
                views: {
                    'albums@data': {
                        templateUrl: '/templates/albums.html',
                        controller: "albums"
                    }
                }
            })
            .state('data.github', {
                url: '/github',
                views: {
                    'github@data': {
                        templateUrl: '/templates/github.html',
                        controller: 'github'
                    }
                }
            })
            .state('data.all', {
                url: '/all',
                views: {
                    'users@data': {
                        templateUrl: '/templates/users.html',
                        controller: 'users'
                    },
                    'albums@data': {
                        templateUrl: '/templates/albums.html',
                        controller: "albums"
                    },
                    'github@data': {
                        templateUrl: '/templates/github.html',
                        controller: 'github'
                    }
                }
            })
    }])*/