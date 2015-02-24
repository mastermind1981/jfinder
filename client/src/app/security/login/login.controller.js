(function () {

	'use strict';

	angular.module('app.security').controller('Login', Login);

	Login.$inject = ['$state', 'notifier', 'login'];

	function Login($state, notifier, login) {
		var vm = this;

		vm.submit = function () {
			login.host = 'http://localhost:3005';
			login(vm.email, vm.password)
				.then(loginSuccess)
				.catch(loginFail);
		};

		vm.google = function () {
			login.withGoogle()
				.then(loginSuccess)
				.catch(loginFail);
		};

		function loginSuccess(response) {
			$state.go('home');

			var greeting = '';

			if (response.user.displayName) {
				greeting = 'Welcome ' + response.user.displayName + '!';
			}

			notifier('success', 'Login', 'Log in successfuly. ' + greeting, 4000);
		}

		function loginFail(response) {
			notifier('warning', 'Login', response.data.message, 4000);
		}
	}

})();
