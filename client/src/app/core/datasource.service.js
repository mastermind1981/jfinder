(function () {

	'use strict';

	angular.module('app.core').factory('datasource', datasource);

	datasource.$inject = ['$http'];

	function datasource($http) {

		var service = {

			getJobs: function () {
				return $http.get(service.host + '/jobs')
					.then(jobsSuccess);
			}

		};

		service.host = 'http://localhost:3000';

		return service;

		function jobsSuccess(data) {
			return data.data;
		}

	}

})();
