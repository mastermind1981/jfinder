(function () {

    'use strict';

    angular.module('app').factory('notifier', notifier);

    notifier.$inject = ['$timeout', 'Notification'];

    function notifier($timeout, Notification) {
        var notification = new Notification();
        var timeout = null;

        var service = function (type, title, message, duration) {
            notification.activate(type, title, message);

            $timeout.cancel(timeout);
            timeout = $timeout(clear, duration || 3000);

            function clear() {
                notification.deactivate();
            }
        };

        service.notification = function () {
            return notification;
        };

        return service;
    }

})();
