(function () {

    'use strict';

    angular.module('app.security').controller('Login', Login);

    Login.$inject = ['$state', '$auth', 'notifier'];

    function Login($state, $auth, notifier) {
        var vm = this;

        vm.submit = function () {
            login.host = 'http://localhost:3005';
            $auth.login({email: vm.email, password: vm.password})
                .then(loginSuccess)
                .catch(loginFail);
        };

        vm.authenticate = function (provider) {
            $auth.authenticate(provider)
                .then(loginSuccess)
                .catch(loginFail);
        };

        function loginSuccess(response) {
            $state.go('home');

            var greeting = '';

            if (response.data.user.displayName) {
                greeting = 'Welcome ' + response.data.user.displayName + '!';
            }

            notifier('success', 'Login', 'Log in successfuly. ' + greeting, 4000);
        }

        function loginFail(response) {
            notifier('warning', 'Login', response.data, 4000);
        }
    }

})();
