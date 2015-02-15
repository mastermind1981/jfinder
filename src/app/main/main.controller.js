(function () {

	'use strict';

	angular.module('app.main').controller('Main', Main);

	function Main() {
		var vm = this;
		vm.date = moment().format("MMM Do YY");
	}

})();
