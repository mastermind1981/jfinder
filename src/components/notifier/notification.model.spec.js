describe('Models', function () {

    beforeEach(module('app'));

    var Notification;

    beforeEach(inject(function (_Notification_) {
        Notification = _Notification_;
    }));

    describe('Notification model', function () {

        it('new instance of Notification model should have visible property set to false', function () {
            var note = new Notification();
            expect(note.visible).to.be.false;
        });

        it('calling method activate on ontification should set visible property to true', function () {
            var note = new Notification();
            note.activate('Type', 'Title', 'Message');
            expect(note.visible).to.be.true;
        });

        it('calling method deactivate on activated notification should set visible property to false', function () {
            var note = new Notification();
            note.activate('Type', 'Title', 'Message');
            expect(note.visible).to.be.true;

            note.deactivate();
            expect(note.visible).to.be.false;
        });

    });

});
