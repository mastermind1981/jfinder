(function () {

    'use strict';

    angular.module('app').factory('Notification', NotificationCreator);

    function NotificationCreator() {

        function Notification() {
            this.type = '';
            this.title = '';
            this.message = '';
            this.visible = false;
        }

        Notification.prototype.activate = function (type, title, message) {
            this.type = type;
            this.title = title;
            this.message = message;
            this.visible = true;
        };

        Notification.prototype.deactivate = function () {
            this.visible = false;
        };

        return Notification;

    }

})();
