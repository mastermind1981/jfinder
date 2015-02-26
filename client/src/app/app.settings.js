(function () {

    'use strict';

    angular.module('app.core').constant('settings', settings());

    function settings() {
        return {

            api: {
                host: 'http://localhost:3005'
            },

            google: {
                url: 'https://accounts.google.com/o/oauth2/auth',
                clientid: '603051516545-o8va2ake9c90k1h8lgidjksg1it4t8ve.apps.googleusercontent.com',
            },

            github: {
                clientId: '7c6f981c5524a16ccf0b'
            }

        };
    }

})();
