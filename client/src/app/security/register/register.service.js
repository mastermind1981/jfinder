(function () {

    'use strict';

    angular.module('app.security').factory('register', register);

    register.$inject = ['$http', 'authToken', 'settings'];

    function register($http, authToken, settings) {

        var service = function (email, password) {
            return $http.post(service.host + '/register', {email: email, password: password})
                .then(registrationSuccess);
        };

        service.host = settings.api.host;

        return service;

        function registrationSuccess(data) {
            var response = data.data;
            authToken.setToken(response.token);

            return response;
        }
    }

})();
