'use strict';

/**
 * @ngdoc function
 * @name towerGameApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the towerGameApp
 */
angular.module('towerGameApp')
	.controller('PlayerCtrl', ['$scope', 'PlayerFactory', function ($scope, PlayerFactory) {
    	this.awesomeThings = [
    		'HTML5 Boilerplate',
    		'AngularJS',
    		'Karma'
    	];
		$scope.message = PlayerFactory.getName();
	}])
	.factory('PlayerFactory', function() {

		var service = {};
		var _name = 'Player';
		var _score = '0';
		var _pos = {
			x: 0,
			y: 0
		};

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
		service.setPos = function (pos) {
			_pos = pos;
		};
		service.getPos = function () {
			return _pos;
		};

		return service;

	});
