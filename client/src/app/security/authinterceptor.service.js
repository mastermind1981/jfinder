(function () {

    'use strict';

    angular.module('app.security').factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['authToken'];

    function authInterceptor(authToken) {
        return {
            request: interceptToken,
            response: function (response) { return response; }
        };

        function interceptToken(config) {
            var token = authToken.getToken();
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    }

})();
