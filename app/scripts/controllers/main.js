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
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		function movePlayer(tempDirection){
			if(40 === tempDirection){
				var currentPos = PlayerFactory.getPos();
				var newPos = {
					x : currentPos.x,
					y : currentPos.y + 1
				};
				console.log(currentPos.x);
				//console.log(currentPos.y);
				console.log(newPos.x);
				//console.log(newPos.y);
				BoardFactory.setCell(currentPos.x, currentPos.y, 'toggle');
				BoardFactory.setCell(newPos.x, newPos.y, 'toggle');
				PlayerFactory.setPos( newPos );
				console.log('getPos');
				console.log(PlayerFactory.getPos());
				console.log('getCell');
				console.log(BoardFactory.getCell(PlayerFactory.getPos().x,PlayerFactory.getPos().y));
			}
		}
		function startTheGame(){
			console.log('Starting Game!')
			BoardFactory.buildBoard();
			var startPos = {
				x: 10,
				y: 10
			}
			BoardFactory.setCell(startPos.x, startPos.y, 'toggle');
			PlayerFactory.setPos(startPos);
			var DIRECTIONS = {
			  LEFT: 37,
			  UP: 38,
			  RIGHT: 39,
			  DOWN: 40
			};
			var $window = $(window);
			/*window.addEventListener("keydown", function(e) {
		      if (e.keyCode == DIRECTIONS.LEFT && snake.direction !== DIRECTIONS.RIGHT) {
		        tempDirection = DIRECTIONS.LEFT;
		      } else if (e.keyCode == DIRECTIONS.UP && snake.direction !== DIRECTIONS.DOWN) {
		        tempDirection = DIRECTIONS.UP;
		      } else if (e.keyCode == DIRECTIONS.RIGHT && snake.direction !== DIRECTIONS.LEFT) {
		        tempDirection = DIRECTIONS.RIGHT;
		      } else if (e.keyCode == DIRECTIONS.DOWN && snake.direction !== DIRECTIONS.UP) {
		        tempDirection = DIRECTIONS.DOWN;
		      }
			});*/
			var tempDirection = ''
			window.addEventListener('keydown', function(e) {
			  e.preventDefault();
			  console.log(e.keyCode);
		      if (e.keyCode == DIRECTIONS.LEFT ) {
		        tempDirection = DIRECTIONS.LEFT;
		      } else if (e.keyCode == DIRECTIONS.UP ) {
		        tempDirection = DIRECTIONS.UP;
		      } else if (e.keyCode == DIRECTIONS.RIGHT ) {
		        tempDirection = DIRECTIONS.RIGHT;
		      } else if (e.keyCode == DIRECTIONS.DOWN ) {
				tempDirection = DIRECTIONS.DOWN;
				var currentPos = PlayerFactory.getPos()
		        BoardFactory.move(tempDirection, currentPos);
				PlayerFactory.setPos(currentPos.x+1, currentPos.y)
		      }
		    });
		}

		$scope.startGame = function(){
			startTheGame()
		};


	}]);
