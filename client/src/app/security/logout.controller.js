(function () {

    'use strict';

    angular.module('app.security').controller('Logout', Logout);

    Logout.$inject = ['$state', '$auth', 'notifier'];

    function Logout($state, $auth, notifier) {
        $auth.logout();
        $state.go('home');
        notifier('success', 'Logout', 'User logged out successfuly');
    }

})();
