(function () {

    'use strict';

    angular.module('app.security').factory('authToken', authToken);

    authToken.$inject = ['$window'];

    function authToken($window) {

        var userTokenKey = 'userToken';

        var storage = $window.localStorage;
        var cachedToken;

        var service = {
            setToken: function (token) {
                cachedToken = token;
                storage.setItem(userTokenKey, token);
            },

            getToken: function () {
                if (!cachedToken) {
                    cachedToken = storage.getItem(userTokenKey);
                }
                return cachedToken;
            },

            removeToken: function () {
                cachedToken = null;
                storage.removeItem(userTokenKey);
            },

            isAuthenticated: function () {
                return !!service.getToken();
            }
        };

        return service;

    }

})();
