(function () {

    'use strict';

    angular.module('app.security').controller('Register', Register);

    Register.$inject = ['$state', 'notifier', '$auth'];

    function Register($state, notifier, $auth) {
        var vm = this;

        vm.submit = function () {
            $auth.signup({email: vm.email, password: vm.password})
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
