(function () {

	'use strict';

	angular.module('app').config(RouterConfig);
	RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function RouterConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/main/main.html',
				controller: 'Main as vm'
			})

			.state('register', {
				url: '/register',
				templateUrl: 'app/register/register.html',
				controller: 'Register as vm'
			});

		$urlRouterProvider.otherwise('/');
	}

})();
