(function () {

    'use strict';

    angular.module('app.security').controller('Login', Login);

    Login.$inject = ['$state', 'notifier', 'login'];

    function Login($state, notifier, login) {
        var vm = this;

        vm.submit = function () {
            login.host = 'http://localhost:3005';
            login(vm.email, vm.password)
                .then(registrationSuccess)
                .catch(registrationFail);
        };

        function registrationSuccess(response) {
            $state.go('home');
            notifier('success', 'Login', 'Log in successfuly', 4000);
        }

        function registrationFail(response) {
            notifier('warning', 'Login', response.data.message, 4000);
        }
    }

})();
