describe('Services', function () {

    var register, $httpBackend;

    beforeEach(module('app.security'));

    beforeEach(inject(function (_register_, _$httpBackend_) {
        register = _register_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.flush();
    });

    describe('Register service', function () {

        it('should execute POST request: /register with default host', function () {
            $httpBackend.expectPOST('http://localhost:3000/register', {email: 'test@test', password: 'pass'}).respond({});
            register('test@test', 'pass');
        });

        it('should execute POST request: /register with custom host', function () {
            $httpBackend.expectPOST('http://custom:8080/register', {email: 'test@test', password: 'pass'}).respond({});
            register.host = 'http://custom:8080';
            register('test@test', 'pass');
        });

    });

});
