'use strict';

/**
 * @ngdoc overview
 * @name towerGameApp
 * @description
 * # towerGameApp
 *
 * Main module of the application.
 */
angular
  .module('towerGameApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
])
.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
    })
    .otherwise({
        redirectTo: '/'
	});
});
