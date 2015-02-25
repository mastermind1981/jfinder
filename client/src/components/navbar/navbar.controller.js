(function () {

    'use strict';

    angular.module('app.components').controller('Navbar', Navbar);

    Navbar.$inject = ['$auth'];

    function Navbar($auth) {
        var vm = this;
        vm.isAuthenticated = $auth.isAuthenticated();
    }

})();
