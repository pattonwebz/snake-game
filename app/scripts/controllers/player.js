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
		// holds some data about the player

		var service = {};
		// initial position is cell 0-0
		var _pos = {
			x: 0,
			y: 0
		};
		// set inital moved state to false - game only starts after movement occurs
		var _moved = false;

		var _score = 0;

		// publicly callable ways to set and get player positions and switches
		// for the initial moved states
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
		service.setScore = function(score) {
			_score = score;
		}
		service.getScore = function() {
			return _score;
		}
		service.addSegment = function() {
			
		}
		// returns the factory publicly available data
		return service;

	});
