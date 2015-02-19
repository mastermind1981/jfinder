describe('Controllers', function () {

    var controller, scope, authToken;
    var createController;

    beforeEach(module('app.components'));

    beforeEach(inject(function ($controller, $rootScope, _authToken_) {
        scope = $rootScope.$new();
        authToken = _authToken_;

        createController = function () {
            return $controller('Navbar', {
                $scope: scope
            });
        };
    }));

    describe('Navbar controller', function () {

        it('should set isAuthenticated property to false if there is no avaiable token', function () {
            sinon.stub(authToken, 'isAuthenticated').returns(false);

            controller = createController();
            expect(controller.isAuthenticated).to.be.false;
        });

        it('should set isAuthenticated property to true if there is an avaiable token', function () {
            sinon.stub(authToken, 'isAuthenticated').returns(true);

            controller = createController();
            expect(controller.isAuthenticated).to.be.true;
        });

    });

});
