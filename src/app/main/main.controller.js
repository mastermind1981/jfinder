(function () {

	'use strict';

	angular.module('app.main').controller('Main', Main);
	Main.$inject = ['$scope', 'dataSource'];

	function Main($scope, dataSource) {
		var vm = this;
		vm.date = moment().format("MMM Do YY");
	}

})();
