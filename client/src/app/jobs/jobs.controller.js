(function () {

	'use strict';

	angular.module('app.jobs').controller('Jobs', Jobs);

	Jobs.$inject = ['datasource', 'notifier'];

	function Jobs(datasource, notifier) {
		var vm = this;

		datasource.host = 'http://localhost:3005';
		datasource.getJobs()
			.then(onJobsSuccess)
			.catch(onJobsFail);

		function onJobsSuccess(response) {
			vm.jobs = response;
		}

		function onJobsFail(response) {
			notifier('warning', 'Jobs', response.data.message);
		}
	}

})();
