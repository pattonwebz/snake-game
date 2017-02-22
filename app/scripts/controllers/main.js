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

		function startTheGame(){
			console.log('Starting Game!');
			BoardFactory.buildBoard();
			var startPos = {
				x: 10,
				y: 10
			};
			BoardFactory.setCell(startPos.x, startPos.y, 'toggle');
			PlayerFactory.setPos(startPos);
			var DIRECTIONS = {
			  LEFT: 37,
			  UP: 38,
			  RIGHT: 39,
			  DOWN: 40
			};

			var tempDirection = '';
			window.addEventListener('keydown', function(e) {
			  e.preventDefault();
			  console.log(e.keyCode);
			  var currentPos = PlayerFactory.getPos();
			  var nextPos = {
				  x: currentPos.x,
				  y: currentPos.y
			  };
		      if (e.keyCode === DIRECTIONS.LEFT ) {
				  nextPos = {
					  x: currentPos.x,
					  y: currentPos.y - 1
				  };
		        tempDirection = DIRECTIONS.LEFT;
				BoardFactory.move(tempDirection, currentPos);
				PlayerFactory.setPlayerMoved(true);
			  } else if (e.keyCode === DIRECTIONS.UP ) {
				  nextPos = {
					  x: currentPos.x - 1,
					  y: currentPos.y
				  };
		        tempDirection = DIRECTIONS.UP;
				BoardFactory.move(tempDirection, currentPos);
				PlayerFactory.setPlayerMoved(true);
			  } else if (e.keyCode === DIRECTIONS.RIGHT ) {
				  nextPos = {
					  x: currentPos.x,
					  y: currentPos.y + 1
				  };
		        tempDirection = DIRECTIONS.RIGHT;
				BoardFactory.move(tempDirection, currentPos);
				PlayerFactory.setPlayerMoved(true);
			  } else if (e.keyCode === DIRECTIONS.DOWN ) {
				  nextPos = {
					  x: currentPos.x + 1,
					  y: currentPos.y
				  };
				tempDirection = DIRECTIONS.DOWN;
		        BoardFactory.move(tempDirection, currentPos);
				PlayerFactory.setPlayerMoved(true);
		      }
		    });
		}

		$scope.startGame = function(){
			startTheGame();
			var moved = false;
			var i = 0;
			setInterval(function () {
				if(false === moved){
					moved = PlayerFactory.hasPlayerMoved();
				} else {
					$scope.$apply();
					if(10 === i){
						BoardFactory.moveForward();
						i = 0;
					}
					i++;
				}

			}, 10);
		};


	}]);
