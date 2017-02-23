'use strict';

/**
 * @ngdoc function
 * @name snakeGameApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the snakeGameApp
 */
angular.module('snakeGameApp')
	.controller('BoardCtrl', ['$scope', 'BoardFactory', 'PlayerFactory', function ($scope, BoardFactory, PlayerFactory) {
		// get the current board - if one doesn't exist then an empty one will be made
		$scope.board = BoardFactory.getBoard();
		// click handle function for board cells - not really in use
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
		// switch to say if board already exists or not
		var boardInitialized = false;
		// return variable to pass back object with data we want shared
		var service = {};

		// this is the cells object that holds all board cells
		var _cells = {};

		// holds the current position and forward postion of the active board
		// cell. IE the player
		var _currentPos = {};
		var _forwardPos = {};

		// sise of the board - x = rows, y = columns
		var _boardSize = {
			x: 20,
			y: 20
		};

		// set starting postion of a fruit
		var _fruitPos = {
			x: 0,
			y: 0
		};

		// flag to say if fruit is present on board
		var _fruitOnBoard = false;

		var _addToScore = 0;

		// private function to set cell states
		function setCell(setX, setY, setState){
			//console.log('setCell');

			// build the key to indentify the cell we're updating
			var cellKey = setX + '-' + setY;
			// new cell values
			var cell = {
				x: setX,
				y: setY,
				state: setState
			};
			//console.log(cell);

			// update the cell
			_cells[cellKey] = cell;
			//console.log(_cells);
		}

		// this is the publicly callable way to set cells
		service.setCell = function (setX, setY, setState) {
			// toggle is the most common change state to be used
			if('toggle' === setState ){
				// since this is a toggle we need to know what the current
				// value is, grab it
				var currentCell = service.getCell(setX, setY);

				//console.log(currentState);

				// switch true/false states in the cell
				if (false === currentCell.state || 'fruit' === currentCell.state){
 				   setState = true;
			    } else if (true === currentCell.state ) {
 				   setState = false;
			   	}
				// build cell key
				var cellKey = setX + '-' + setY;
				// new cell data
				var cell = {
					x: setX,
					y: setY,
					state: setState
				};
				// udpdate the cell
				_cells[cellKey] = cell;
				//console.log('setcell');
				//console.log(_cells[cellKey]);
			}
			// since this isn't a pre-defined state update with custom state
			setCell(setX, setY, setState);
		};
		function buildBoard() {
			// if board is already built then log message to console
			if(boardInitialized){
				console.log('board already initialized, resetting...');
			}
			//console.log('buildBoard');

			// loop loop through each x (row) and create a cell for each
			// y (col) in it
			for ( var i=0; i<_boardSize.x; i++ ){
				// x = row
				//console.log('for x');
				for ( var j=0; j<_boardSize.y; j++ ){
					// y = col
					//console.log('for y');
					// create a cell with current row,col,state
					service.setCell(i,j,false);
				}
			}
			boardInitialized = true;

		}
		// publically callable way to build a board
		service.buildBoard = function() {
			buildBoard();
		};
		// publically callable way to get the current board
		service.getBoard = function() {
			// if board exists log a message else build one
			if(boardInitialized){
				console.log('board already initialized, returning...');
			} else {
				buildBoard();
			}
			// return the board cells
			return _cells;
		};
		// publically callable way to get specific cell data
		service.getCell = function (x, y) {
			var id = x + '-' + y;
			return _cells[id];
		};
		service.moveForward = function () {
			// get the next cell state so we can do things when it's a fruit
			var _nextCell = service.getCell(_forwardPos.x, _forwardPos.y);
			if('fruit' === _nextCell.state){
				service.addToScore(100);
				service.removeFruitFromBoard();
			}
				// NOTE: these variables are set in the other move function is this factory
				// set the state of the next cell we're moving to
				service.setCell(_forwardPos.x,_forwardPos.y, 'toggle');
				// set the state of the last cell we moved from
				service.setCell(_currentPos.x,_currentPos.y, 'toggle');
				// update current position variables
				_currentPos.x = _forwardPos.x;
				_currentPos.y = _forwardPos.y;

		};
		service.move = function (tempDirection, currentPos) {
			// set initial value to the same as current value - we return this if no move happens
			var x = currentPos.x;
			var y = currentPos.y;
			// if the direction is one corresponding to an arrow key then set new
			// x and y values for that direction
			if(40 === tempDirection){
				x = currentPos.x + 1;
				y = currentPos.y;
			} else if (39 === tempDirection ){
				y = currentPos.y + 1;
				x = currentPos.x;
			} else if (38 === tempDirection ){
				x = currentPos.x - 1;
				y = currentPos.y;
			} else if (37 === tempDirection ){
				y = currentPos.y - 1;
				x = currentPos.x;
			}
			// set the factory variables to match any updated values
			_currentPos = currentPos;
			_forwardPos = {
				'x': x,
				'y': y
			};
		};

		// publically callable way to get all the cells - same as getting a board
		service.getCells = function () {
			return _cells;
		};
		// publically callable way to set an entire board
		service.setCells = function (cells) {
			_cells = cells;
		};

		// publically callable way to get the board size
		service.getBoardSize = function () {
			return _boardSize;
		};

		service.addFruitLocation = function (x, y) {
			_fruitPos = {
				"x": x,
				"y": y
			}
			service.setCell(x,y, 'fruit')
			_fruitOnBoard = true;
		};

		service.isFruitOnBoard = function() {
			return _fruitOnBoard;
		};
		service.removeFruitFromBoard = function() {
			console.log('remove');
			_fruitPos = {
				x: 0,
				y: 0
			}
			_fruitOnBoard = false;
		};
		service.addToScore = function(addToScore) {
			_addToScore = _addToScore + addToScore
		};
		service.toScore = function() {
			return _addToScore;
		};

		return service;

	});
