describe('Controllers', function () {

    var scope, notifier, dataSource;
    var createController;

    beforeEach(module('app.jobs'));

    beforeEach(inject(function ($controller, $rootScope, _notifier_, _dataSource_) {
        scope = $rootScope.$new();
        notifier = _notifier_;
        dataSource = _dataSource_;

        createController = function () {
            return $controller('Jobs', {
                $scope: scope,
                notifier: notifier
            });
        };
    }));

    describe('Login controller', function () {

        it('should invoke dataSource service and pull data', inject(function ($q) {
            sinon.stub(dataSource, 'getJobs').returns($q.when(['Element 1', 'Element 2']));

            var controller = createController();
            expect(dataSource.getJobs.calledOnce).to.be.true;
        }));

        it('should update jobs array with a response from dataSource getJobs method', inject(function ($q) {
            sinon.stub(dataSource, 'getJobs').returns($q.when(['Element 1', 'Element 2']));

            var controller = createController();
            scope.$apply();

            expect(controller.jobs).to.have.length(2);
            expect(controller.jobs).to.contain('Element 2');
        }));

        it('should invoke notifier service with correct message when dataSource return error', inject(function ($q) {
            sinon.stub(dataSource, 'getJobs').returns($q.reject({ data: { message: 'error message' } }));
            notifier = sinon.spy(notifier);

            var controller = createController();
            scope.$apply();

            expect(notifier.calledOnce).to.be.true;
            expect(notifier.args[0][2]).to.be.equal('error message');
        }));

    });

});
