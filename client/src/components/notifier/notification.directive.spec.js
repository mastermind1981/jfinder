describe('Directives', function () {

    var element, scope, innerScope;
    var notifier, $timeout;

    beforeEach(module('app.components'));

    beforeEach(inject(function ($templateCache, $rootScope, $compile, _notifier_, _$timeout_) {
        notifier = _notifier_;
        $timeout = _$timeout_;

        $templateCache.put('components/notifier/notification.html',
            '<div class="notification-placeholder" ng-cloak>' +
                '<div class="notification alert alert-{{notification.type}} animated" ng-class="{ \'flipInY\': notification.visible, \'flipOutY\': !notification.visible, \'hidden\': !dirty }">' +
                    '<strong>{{ notification.title }}</strong> {{ notification.message }} <button ng-click="close()" class="pull-right btn btn-primary btn-xs">close</button>' +
                '</div>' +
            '</div>'
        );

        element = angular.element('<notification></notification>');
        scope = $rootScope.$new();

        $compile(element)(scope);

        scope.$digest();
    }));

    describe('Notification directive', function () {

        it('should change dirty status when notifier service has been invoked', function () {
            expect(scope.dirty).to.be.false;

            notifier('Type', 'Title', 'Message');
            scope.$digest();
            $timeout.flush();

            expect(scope.dirty).to.be.true;
        });

        it('shoud have class hidden if notifier was never invoked', function () {
            expect(element.find('.notification').hasClass('hidden')).to.be.true;
        });

        it('shoud not have class hidden if notifier was never invoked', function () {
            notifier('Type', 'Title', 'Message');
            scope.$digest();
            $timeout.flush();

            expect(element.find('.notification').hasClass('hidden')).to.be.false;
        });

        it('should contain correct information about the notification', function () {
            notifier('success', 'Test', 'test message content');
            scope.$digest();

            expect(element.find('.notification').hasClass('alert-success'));
            expect(element.find('.notification').text()).to.contain('test message content');
            expect(element.find('strong').text()).to.equal('Test');
        });

        it('should have correct animation classes', function () {
            expect(element.find('.notification').hasClass('flipOutY')).to.be.true;
            expect(element.find('.notification').hasClass('flipInY')).to.be.false;

            notifier('Type', 'Title', 'Message');
            scope.$digest();

            expect(element.find('.notification').hasClass('flipOutY')).to.be.false;
            expect(element.find('.notification').hasClass('flipInY')).to.be.true;
        });

        it('should update notification when close method is invoked', function () {
            notifier('success', 'Test', 'test message content');
            scope.$digest();

            expect(notifier.notification().visible).to.be.true;

            scope.close();
            scope.$digest();
            expect(notifier.notification().visible).to.be.false;
        });

    });

});
