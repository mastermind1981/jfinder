describe('Services', function () {

    var notifier, $timeout;

    beforeEach(module(function($provide) {
        $provide.decorator('$timeout', function($delegate) {
            return sinon.spy($delegate);
        });
    }));

    beforeEach(module('app.components'));

    beforeEach(inject(function (_notifier_, _$timeout_) {
        notifier = _notifier_;
        $timeout = _$timeout_;
    }));

    describe('Notifier service', function () {

        it('notification visiblitiy status workflow should be correct', function () {
            expect(notifier.notification().visible).to.be.false;

            notifier('Type', 'Title', 'Message');
            expect(notifier.notification().visible).to.be.true;

            $timeout.flush();
            expect(notifier.notification().visible).to.be.false;
        });

        it('should invoke $imeout function with default duration if custom parameter is not specified', function () {
            notifier('Type', 'Title', 'Message');
            expect($timeout.args[0][1]).to.equal(3000);
            $timeout.flush();
        });

        it('should invoke $timeout function with correct duration parameter', function () {
            notifier('Type', 'Title', 'Message', 4500);
            expect($timeout.args[0][1]).to.equal(4500);
            $timeout.flush();
        });

    });

});
