'use strict';

/**
 * @ngdoc function
 * @name towerGameApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the towerGameApp
 */
angular.module('towerGameApp')
	.controller('BoardCtrl', ['$scope', 'BoardFactory', function ($scope, BoardFactory) {
		$scope.board = BoardFactory.getBoard();
	}])
	.factory('BoardFactory', ['$window', function($window) {
		var service = {};
		var _cells = {};

		var boardSize = {
			x: 20,
			y: 20
		};

		function setCell(setX, setY, setState){
			console.log('setCell');

			var cellKey = setX + '-' + setY;
			var cell = {
				'x': setX,
				'y': setY,
				'state': setState

			};
			console.log(cell);
			_cells[cellKey] = cell;
			//console.log(_cells);
		}
		service.setCell = function (setX, setY, setState) {
			setCell(setX, setY, setState);
		};
		function buildBoard(BoardFactory) {
			console.log('buildBoard');
			console.log(boardSize.x);
			for ( var i=0; i<boardSize.x; i++ ){
				// x = row
				console.log('for x');
				for ( var j=0; j<boardSize.y; j++ ){
					// y = col
					console.log('for y');
					service.setCell(i,j,false);
				}
			}
		};
		service.getBoard = function() {

			buildBoard();
			return _cells;
		};
		service.getCell = function (x, y) {
			return _cells.state;
		};


		return service;

	}]);
