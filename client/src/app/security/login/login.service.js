(function () {

    'use strict';

    angular.module('app.security').factory('login', login);

    login.$inject = ['$http', 'authToken'];

    function login($http, authToken) {
        var service = function (email, password) {
            return $http.post(service.host + '/login', {email: email, password: password})
                .then(loginSuccess);
        };

        service.host = 'http://localhost:3000';

        return service;

        function loginSuccess(data) {
            var response = data.data;
            authToken.setToken(response.token);
            return response;
        }
    }

})();
