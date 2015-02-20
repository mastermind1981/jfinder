describe('Services', function () {

    var authToken, $window;

    beforeEach(module('app.security'));

    beforeEach(inject(function (_$window_, _authToken_) {
        authToken = _authToken_;
        $window = _$window_;
    }));

    describe('Auth Token service', function () {

        it('should set user token in local storage', function () {
            authToken.setToken('sample token');
            expect($window.localStorage.getItem('userToken')).to.be.equal('sample token');
        });

        it('should remove user token from local storage', function () {
            $window.localStorage.setItem('userToken', 'sample token');
            expect($window.localStorage.getItem('userToken')).to.be.equal('sample token');

            authToken.removeToken();
            expect($window.localStorage.getItem('userToken')).to.be.null;
        });

        it('should pull user token from loacl storage', function () {
            $window.localStorage.setItem('userToken', 'sample token');
            expect($window.localStorage.getItem('userToken')).to.be.equal('sample token');

            expect(authToken.getToken()).to.be.equal('sample token');
        });

    });

});
