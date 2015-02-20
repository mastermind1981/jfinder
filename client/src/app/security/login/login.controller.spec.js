describe('Controller', function () {

    var scope, notifier, login;
    var createController;

    beforeEach(module('ui.router'));

    beforeEach(module('app.security'));

    beforeEach(inject(function ($controller, $rootScope, _notifier_, _login_) {
        scope = $rootScope.$new();
        notifier = _notifier_;
        login = _login_;

        createController = function () {
            return $controller('Login', {
                $scope: scope,
                notifier: notifier,
                login: login
            });
        };
    }));

    describe('Login controller', function () {

        it('should invoke login service with correct credentials', function () {
            login = sinon.spy(login);

            var controller = createController();
            controller.email = 'test@test';
            controller.password = 'pass';

            controller.submit();

            expect(login.calledOnce).to.be.true;
            expect(login.args[0][0]).to.be.equal('test@test');
            expect(login.args[0][1]).to.be.equal('pass');
        });

    });

});
