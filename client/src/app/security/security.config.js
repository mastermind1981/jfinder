(function () {

    'use strict';

    angular.module('app.security').config(config);

    config.$inject = ['$httpProvider', '$authProvider', 'settings'];

    function config($httpProvider, $authProvider, settings) {
        $httpProvider.interceptors.push('authInterceptor');

        $authProvider.loginUrl = settings.api.host + '/login';
        $authProvider.signupUrl = settings.api.host + '/register';

        $authProvider.google({
            clientId: settings.google.clientid,
            url: settings.api.host + '/auth/google'
        });
    }

})();
