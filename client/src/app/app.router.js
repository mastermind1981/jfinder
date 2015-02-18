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

			.state('jobs', {
				url: '/jobs',
				templateUrl: 'app/jobs/jobs.html',
				controller: 'Jobs as vm'
			})

			.state('register', {
				url: '/register',
				templateUrl: 'app/security/register/register.html',
				controller: 'Register as vm'
			})

			.state('logout', {
				url: '/logout',
				controller: 'Logout as vm'
			});

		$urlRouterProvider.otherwise('/');
	}

})();
