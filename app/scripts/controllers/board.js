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
		$scope.handleClick = function ($event) {
			var x = $event.target.dataset.posx;
 			var y = $event.target.dataset.posy;
			console.log(($event));
			function getCurrentCellState(){
 				var currentState = $event.target.dataset.state;
				// default is to pass back current state in case of failure
				var newState = currentState;
				//console.log(currentState);
 				if ('false' === currentState){
 				   newState = true;
			   	} else if ('true' === currentState) {
 				   newState = false;
 				}
				//console.log(newState);
 			  	return newState;
 		   	}
 			var state = getCurrentCellState($event);

			state = 'toggle';
 		   BoardFactory.setCell(x,y,state);
	   };

	}])
	.factory('BoardFactory', function() {
		var boardInitialized = false;
		var service = {};
		var _cells = {};

		var boardSize = {
			x: 20,
			y: 20
		};

		function setCell(setX, setY, setState){
			//console.log('setCell');

			var cellKey = setX + '-' + setY;
			var cell = {
				x: setX,
				y: setY,
				state: setState
			};
			console.log(cell);
			_cells[cellKey] = cell;
			//console.log(_cells);
		}

		service.setCell = function (setX, setY, setState) {
			if('toggle' === setState ){
				var currentCell = service.getCell(setX, setY);
				//console.log(currentState);
				if (false === currentCell.state){
 				   setState = true;
			   } else if (true === currentCell.state) {
 				   setState = false;
 				}
				//console.log(service.getCell(setX, setY));
			}
			console.log(setState);
			setCell(setX, setY, setState);
		};
		function buildBoard() {
			if(boardInitialized){
				console.log('board already initialized, resetting...');
			}
			console.log('buildBoard');
			//console.log(boardSize.x);
			for ( var i=0; i<boardSize.x; i++ ){
				// x = row
				//console.log('for x');
				for ( var j=0; j<boardSize.y; j++ ){
					// y = col
					//console.log('for y');
					service.setCell(i,j,false);
				}
			}
			boardInitialized = true;

		}
		service.buildBoard = function() {
			buildBoard();
		};
		service.getBoard = function() {
			buildBoard();
			return _cells;
		};
		service.getCell = function (x, y) {
			var id = x + '-' + y;
			return _cells[id];
		};
		service.move = function (tempDirection, currentPos) {
			if(40 === tempDirection){
				service.setCell(currentPos.x + 1, currentPos.y, 'toggle' );
			}
		};

		return service;

	});
