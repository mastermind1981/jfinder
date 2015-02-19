(function () {

    'use strict';

    angular.module('app.security').config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }

})();
