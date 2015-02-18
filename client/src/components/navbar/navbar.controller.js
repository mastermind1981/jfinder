(function () {

    'use strict';

    angular.module('app.components').controller('Navbar', Navbar);

    Navbar.$inject = ['authToken'];

    function Navbar(authToken) {
        var vm = this;
        vm.isAuthenticated = authToken.isAuthenticated();
    }

})();
