describe('Services', function () {

    var register, $httpBackend, settings;

    beforeEach(module('app'));

    beforeEach(module('app.security'));

    beforeEach(inject(function (_register_, _$httpBackend_, _settings_) {
        register = _register_;
        settings = _settings_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.flush();
    });

    describe('Register service', function () {

        it('should execute POST request: /register with default host', function () {
            $httpBackend.expectPOST(settings.api.host + '/register', {email: 'test@test', password: 'pass'}).respond({});
            register('test@test', 'pass');
        });

        it('should execute POST request: /register with custom host', function () {
            $httpBackend.expectPOST('http://custom:8080/register', {email: 'test@test', password: 'pass'}).respond({});
            register.host = 'http://custom:8080';
            register('test@test', 'pass');
        });

    });

});
