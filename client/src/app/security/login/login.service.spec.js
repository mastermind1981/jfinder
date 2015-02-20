describe('Services', function () {

    var $httpBackend, login, authToken;

    beforeEach(module('app.security'));

    beforeEach(inject(function (_$httpBackend_, _login_, _authToken_) {
        $httpBackend = _$httpBackend_;
        login = _login_;
        authToken = _authToken_;
    }));

    afterEach(function () {
        $httpBackend.flush();
    });

    describe('Login service', function () {

        it('should execute POST request: /login with default host', inject(function ($q) {
            $httpBackend.expectPOST('http://localhost:3000/login', { email: 'test@test', password: 'pass' }).respond({ token: 'token' });
            login('test@test', 'pass');
        }));

        it('should execute POST request: /login with custom host', inject(function ($q) {
            $httpBackend.expectPOST('http://custom:8080/login', { email: 'test@test', password: 'pass' }).respond({ token: 'token' });

            login.host = 'http://custom:8080';
            login('test@test', 'pass');
        }));

        it('should invoke setToken method from authToken service', inject(function ($q) {
            $httpBackend.expectPOST('http://localhost:3000/login', { email: 'test@test', password: 'pass' }).respond({ token: 'token' });

            sinon.spy(authToken, 'setToken');

            login('test@test', 'pass').then(function (res) {
                expect(authToken.setToken.calledOnce).to.be.true;
                expect(authToken.setToken.args[0][0]).to.be.equal('token');
            });
        }));

    });

});
