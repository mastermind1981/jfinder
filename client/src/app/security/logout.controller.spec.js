describe('Controllers', function () {

    var scope, authToken, notifier, $state;
    var createController;

    beforeEach(module('ui.router'));

    beforeEach(module('app.security'));

    beforeEach(inject(function ($controller, $rootScope, _authToken_, _notifier_, _$state_) {
        scope = $rootScope.$new();
        authToken = _authToken_;
        notifier = _notifier_;
        $state = _$state_;

        createController = function () {
            return $controller('Logout', {
                $scope: scope,
                authToken: authToken,
                notifier: notifier
            });
        }
    }));

    beforeEach(function () {
        sinon.stub($state, 'go').returns(true);
    });

    describe('Logout controller', function () {

        it('should invoke authToken removeToken method from controller', function () {
            sinon.spy(authToken, 'removeToken');
            var controller = createController();

            expect(authToken.removeToken.calledOnce).to.be.true;
        });

        it('should invoke notifier function from controller', function () {
            notifier = sinon.spy(notifier);
            var controller = createController();

            expect(notifier.calledOnce).to.be.true;
        });

    });

});
