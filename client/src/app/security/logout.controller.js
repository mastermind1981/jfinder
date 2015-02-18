(function () {

    'use strict';

    angular.module('app.security').controller('Logout', Logout);

    Logout.$inject = ['$state', 'authToken', 'notifier'];

    function Logout($state, authToken, notifier) {
        authToken.removeToken();
        $state.go('home');
        notifier('success', 'Logout', 'User logged out successfuly');
    }

})();
