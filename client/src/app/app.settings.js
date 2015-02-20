(function () {

    'use strict';

    angular.module('app').value('settings', settings());

    function settings() {
        return {

            api: {
                host: 'http://localhost:3005'
            }

        };
    }

})();
