'use strict';

/**
 * @ngdoc function
 * @name towerGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the towerGameApp
 */
angular.module('towerGameApp')
	.controller('MainCtrl', ['$scope', 'BoardFactory', 'PlayerFactory', function ($scope, BoardFactory, PlayerFactory) {

	// this needs to be accessable to the whole program
	var tempDirection = '';
		function startTheGame(){
			console.log('Starting Game!');
			// build the board again on start - useful to reset
			BoardFactory.buildBoard();
			// set the starting position of the player
			var startPos = {
				x: 10,
				y: 10
			};
			// toggle the cell player starts in to filled state
			BoardFactory.setCell(startPos.x, startPos.y, 'toggle');
			// set player data with it's staring position
			PlayerFactory.setPos(startPos);
			// this is an object holding the keys to watch for
			// we only need to know the arrow key values
			var DIRECTIONS = {
			  LEFT: 37,
			  UP: 38,
			  RIGHT: 39,
			  DOWN: 40
			};
			// Start a listener for key presses
			window.addEventListener('keydown', function(e) {

				// stop keys doing their default action
				// TODO: move this to inside our key test so it only prevents
				// 		 actions on they keys we use
				e.preventDefault();

				// log the keypress to console
				//console.log(e.keyCode);

				// check if the pressed key is an arrow key - if so then store
				// the direction and set out player moved flag to true so the
				// game starts
				if (e.keyCode === DIRECTIONS.LEFT ) {
					tempDirection = DIRECTIONS.LEFT;
					PlayerFactory.setPlayerMoved(true);
				} else if (e.keyCode === DIRECTIONS.UP ) {
					tempDirection = DIRECTIONS.UP;
					PlayerFactory.setPlayerMoved(true);
				} else if (e.keyCode === DIRECTIONS.RIGHT ) {
					tempDirection = DIRECTIONS.RIGHT;
					PlayerFactory.setPlayerMoved(true);
				} else if (e.keyCode === DIRECTIONS.DOWN ) {
					tempDirection = DIRECTIONS.DOWN;
					PlayerFactory.setPlayerMoved(true);
				}
		    });
		}

		$scope.startGame = function(){
			// run the start game function to reset board and start listener
			startTheGame();
			// set the inital moved state to false - game truly starts on first move
			var moved = false;
			var i = 0;
			// start our frames loop as an interval
			setInterval(function () {
				// check if player has moved yet
				if(false === moved){
					// haven't moved already - check if moved this tick
					moved = PlayerFactory.hasPlayerMoved();
				} else {
					// redraws the board based on any changes we made last tick
					$scope.$apply();
					// every X amount of loops trigger a move
					if(10 === i){
						// set the next move location based on last known direction
						BoardFactory.move(tempDirection, PlayerFactory.getPos())
						// make the move
						BoardFactory.moveForward();
						// reset loop counter
						i = 0;
					}
					i++;
				}

			}, 10);
		};


	}]);
