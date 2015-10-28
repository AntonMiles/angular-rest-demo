'use strict';

angular.module("myApp", [
    'ui.router'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('^/home');
  $stateProvider
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
      .state('data.users', {
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
          'albums@data':{
            templateUrl: '/templates/albums.html',
            controller: "albums"
          }
        }
      })
      .state('data.all', {
        url: '/all',
        views: {
          'users@data':{
            templateUrl: '/templates/users.html',
            controller: 'users'
          },
          'albums@data': {
            templateUrl: '/templates/albums.html',
            controller: "albums"
          }
        }
      })
}]);
