(function () {

    'use strict';

    angular.module('app.main').controller('Main', Main);

    Main.$inject = ['notifier'];

    function Main(notifier) {
        var vm = this;
        vm.date = moment().format("MMM Do YY");

        vm.submit = function () {
            notifier('success', 'Main', 'Button subbmited', 3000);
        };
    }

})();
