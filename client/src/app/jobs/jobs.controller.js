(function () {

    'use strict';

    angular.module('app.jobs').controller('Jobs', Jobs);

    Jobs.$inject = ['dataSource', 'notifier'];

    function Jobs(dataSource, notifier) {
        var vm = this;

        dataSource.host = 'http://localhost:3005';
        dataSource.getJobs()
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
