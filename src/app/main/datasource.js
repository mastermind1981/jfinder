(function () {

	'use strict';

	angular.module('app.main').factory('dataSource', DataSource);
	DataSource.$inject = ['$http', '$q'];

	function DataSource($http, $q) {
		var service = {};

		service.get = function (resource) {
			return $http.get('app/main/data/' + resource + '.json')
			.then(function (data, status, headers, config) {
				return data.data;
			})
			.catch(function(message) {
				console.log('Error: Could not pull data for ' + resource + ' resource');
			});
		};

		return service;
	}

})();
