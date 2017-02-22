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

		$scope.pos = PlayerFactory.getPos();

	}])
	.factory('PlayerFactory', function() {

		var service = {};
		var _pos = {
			x: 0,
			y: 0
		};
		// set inital moved state to false
		var _moved = false;

		service.setPos = function (pos) {
			_pos = pos;
		};
		service.getPos = function () {
			return _pos;
		};
		service.setPlayerMoved = function(moved) {
			_moved = moved;
		}
		service.hasPlayerMoved = function() {
			return _moved;
		}
		return service;

	});
