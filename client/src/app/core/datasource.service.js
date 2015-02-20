(function () {

    'use strict';

    angular.module('app.core').factory('dataSource', datasource);

    datasource.$inject = ['$http', 'settings'];

    function datasource($http, settings) {

        var service = {
            getJobs: function () {
                return $http.get(service.host + '/jobs')
                    .then(jobsSuccess);
            }
        };

        service.host = settings.api.host;

        return service;

        function jobsSuccess(data) {
            return data.data;
        }

    }

})();
