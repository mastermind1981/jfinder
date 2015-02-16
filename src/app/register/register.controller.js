(function () {

    'use strict';

    angular.module('app.register').controller('Register', Register);
    Register.$inject = ['$location','notifier'];

    function Register($location, notifier) {
        var vm = this;

        vm.submit = function () {
            notifier('success', 'Registration', 'Registration complete.', 3000);
        };
    }

})();
