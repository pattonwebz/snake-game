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

	$scope.gameScore = function(){
		return PlayerFactory.getScore();
	};

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
				console.log(e.keyCode);

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
			tempDirection = '';
			PlayerFactory.setScore(0);
			// run the start game function to reset board and start listener
			startTheGame();
			// set the inital moved state to false - game truly starts on first move
			PlayerFactory.setPlayerMoved(false);
			var moved = false;
			// flag for when fruit is active in the board
			var fruitOnBoard = false;
			var i = 0;
			// start our frames loop as an interval
			clearInterval(t);
			var t = setInterval(function () {
				// check if player has moved yet
				if (false === fruitOnBoard){
					//$scope.addFruit();
				}
				if(false === moved){
					// haven't moved already - check if moved this tick
					moved = PlayerFactory.hasPlayerMoved();
				} else {
					// redraws the board based on any changes we made last tick
					$scope.$apply();
					// every X amount of loops trigger a move
					if(10 === i){
						// set the next move location based on last known direction
						var playerPos = PlayerFactory.getPos();
						if ( tempDirection === 37 ) {
							if((playerPos.y - 1) < 0){
								clearInterval(t);
								$scope.gameOver();
							}
						} else if ( tempDirection === 38 ) {
							if((playerPos.x - 1) < 0){
								clearInterval(t);
								$scope.gameOver();
							}
						} else if ( tempDirection === 39 ) {
							if((playerPos.y + 1) > 19){
								clearInterval(t);
								$scope.gameOver();
							}

						} else if ( tempDirection === 40 ) {
							if((playerPos.x + 1) > 19){
								clearInterval(t);
								$scope.gameOver();
							}
						}
						var scoreFromBoard = BoardFactory.toScore();
						if (scoreFromBoard > 0){
							BoardFactory.addToScore(-Math.abs(scoreFromBoard));
						}
						PlayerFactory.setScore(PlayerFactory.getScore() + 1 + scoreFromBoard);
						BoardFactory.move(tempDirection, playerPos)
						// make the move
						BoardFactory.moveForward();
						// reset loop counter
						i = 0;
						if( false === fruitOnBoard ){
							$scope.addFruit();
						}
						// set fruitOnBoard for next itteration
						fruitOnBoard = BoardFactory.isFruitOnBoard();
					}
					i++;
				}

			}, 10);
		};
		// add a fruit to the board
		$scope.addFruit = function() {
 		   // get board size
 		   var boardSize = BoardFactory.getBoardSize();Math.floor(Math.random() * (20))
 		   var randomX = Math.floor(Math.random() * (boardSize.x));
 		   var randomY = Math.floor(Math.random() * (boardSize.y));
 		   console.log('x: ' + randomX + ', y: ' + randomY);
		   BoardFactory.addFruitLocation(randomX, randomY);
 	   };

	   $scope.gameOver = function() {
		   alert('gameOver');
	   };


	}]);
