describe('Services', function () {

    var $httpBackend, login;

    beforeEach(module('app.security'));

    beforeEach(inject(function (_$httpBackend_, _login_) {
        $httpBackend = _$httpBackend_;
        login = _login_;
    }));

    afterEach(function () {
        $httpBackend.flush();
    });

    describe('Login service', function () {



    });

});
