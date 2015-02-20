(function () {

    'use strict';

    angular.module('app.security').factory('login', login);

    login.$inject = ['$http', 'authToken', 'settings'];

    function login($http, authToken, settings) {
        var service = function (email, password) {
            return $http.post(service.host + '/login', {email: email, password: password})
                .then(loginSuccess);
        };

        service.host = settings.api.host;

        return service;

        function loginSuccess(data) {
            var response = data.data;
            authToken.setToken(response.token);
            return response;
        }
    }

})();
