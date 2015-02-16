describe('Models', function () {

    var Notification;

    beforeEach(module('app'));

    beforeEach(inject(function (_Notification_) {
        Notification = _Notification_;
    }));

    describe('Notification model', function () {

        it('should activate notification', function () {
            var note = new Notification();
            expect(note.visible).toBe(false);

            note.activate('success', 'Note Title', 'Note message');
            expect(note.visible).toBe(true);
        });

        it('should deactive notification', function () {
            var note = new Notification();
            note.activate('success', 'Note Title', 'Note message');
            expect(note.visible).toBe(true);

            note.deactivate();
            expect(note.visible).toBe(false);
        });

    });

});
