(function () {

    'use strict';

    angular.module('app').directive('notification', notification);

    notification.$inject = ['notifier'];

    function notification(notifier) {
        var directive = {
            restrict: 'EA',
            templateUrl: 'components/notifier/notification.html',
            replace: true,
            link: link
        };

        return directive;

        function link(scope, elemenet, attrs) {
            scope.dirty = false;

            scope.$watch(watchNotification, updateNotification);

            function watchNotification(scope) {
                var notification = notifier.notification();
                if (notification.visible) scope.dirty = true;
                return notification;
            }

            function updateNotification(notification) {
                scope.notification = notification;
            }
        }
    }

})();
