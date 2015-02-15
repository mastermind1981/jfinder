(function () {

	'use strict';

	angular.module('app.register').controller('Register', Register);

	function Register() {
		var vm = this;

		vm.submit = function () {
			console.log('User has submited registration form');
		};
	}

})();
