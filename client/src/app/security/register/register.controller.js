(function () {

    'use strict';

    angular.module('app.security').controller('Register', Register);

    Register.$inject = ['$state', 'notifier', 'register'];

    function Register($state, notifier, register) {
        var vm = this;

        vm.submit = function () {
            register.host = 'http://localhost:3005';

            register(vm.email, vm.password)
                .then(registrationSuccess)
                .catch(registrationFail);
        };

        function registrationSuccess(data) {
            $state.go('home');
            notifier('success', 'Registration', 'New user created successfuly', 4000);
        }

        function registrationFail(data) {
            notifier('warning', 'Registration', 'Problems occurred during registration process', 4000);
        }
    }

})();

// todo: write tests for controller
