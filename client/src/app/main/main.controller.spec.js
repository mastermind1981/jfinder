describe('Controllers', function () {

    var scope, notifier;
    var createController;

    beforeEach(module('app.main'));

    beforeEach(inject(function ($controller, $rootScope, _notifier_) {
        scope = $rootScope.$new();
        notifier = _notifier_;

        createController = function () {
            return $controller('Main', {
                $scope: scope,
                notifier: notifier
            });
        };
    }));

    describe('Main controller', function () {

        it('should contain current date in scope', function () {
            var controller = createController();
            expect(controller.date).to.be.equal( moment().format("MMM Do YY") );
        });

        it('submit function should invoke notifier service', function () {
            notifier = sinon.spy(notifier);

            var controller = createController();
            controller.submit();
            expect(notifier.calledOnce).to.be.true;
        });

    });

});
