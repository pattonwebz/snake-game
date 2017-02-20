'use strict';

/**
 * @ngdoc function
 * @name towerGameApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the towerGameApp
 */
angular.module('towerGameApp')
	.controller('PlayerCtrl', ['$scope', 'playerFactory', function ($scope, playerFactory) {
    	this.awesomeThings = [
    		'HTML5 Boilerplate',
    		'AngularJS',
    		'Karma'
    	];
		$scope.message = playerFactory.getName();
	}])
	.factory('playerFactory', function() {

		var service = {};
		var _name = 'Player';
		var _score = '0';

			service.setName = function (name) {
				_name = name;
			};
			service.getName = function () {
				return _name;
			};

			service.setScore = function (score) {
		  		_score = score;
			};
			service.getScore = function () {
		  		return _score;
			};

		return service;

	});
