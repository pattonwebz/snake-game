'use strict';

/**
 * @ngdoc overview
 * @name towerGameApp
 * @description
 * # towerGameApp
 *
 * Main module of the application.
 */
angular
  .module('towerGameApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
])
.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
    })
    .otherwise({
        redirectTo: '/'
	});
});
function hashchanged(){
	var hash = location.hash;
	//your code
	console.log(hash);
	if('' !== hash){
		$('ul.nav.navbar-nav li').each( function () {
			var link = $('a', this).attr('href');
			link = link.substring(1, link.length);
			if( hash === link && false === $( this ).hasClass( 'active' ) ){
				$( this ).addClass( 'active' );
			} else {
				$( this ).removeClass( 'active' );
			}
		});
	}
}
$( document ).ready( function() {
	$('#exampleModal').on('show.bs.modal', function () {
		var modal = $(this);
  		modal.find('.modal-title').text('New User Info');
	});
	// Bind the event.
	$(window).on('hashchange', function () {
	    hashchanged();
	}).trigger('hashchange');
});
