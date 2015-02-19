describe('Services', function () {

    var $httpBackend, dataSource;

    beforeEach(module('app.core'));

    beforeEach(inject(function (_$httpBackend_, _dataSource_) {
        $httpBackend = _$httpBackend_;
        dataSource = _dataSource_;
    }));

    afterEach(function () {
        $httpBackend.flush();
    });

    describe('Data Source service', function () {

        it('should execute GET request: /jobs with default host', function () {
            $httpBackend.expectGET('http://localhost:3000/jobs').respond([]);
            dataSource.getJobs();
        });

        it('should execute GET request: /jobs with custom host', function () {
            $httpBackend.expectGET('http://custom:8080/jobs').respond([]);
            dataSource.host = 'http://custom:8080';
            dataSource.getJobs();
        });

        it('should return array of elements', function () {
            $httpBackend.expectGET('http://localhost:3000/jobs').respond(['Element 1', 'Element 2', 'Element 3']);

            dataSource.getJobs().then(function (response) {
                expect(response).to.have.length(3);
                expect(response).to.contain('Element 2');
            });

        });

        it('should return empty array if there is no records fetched from back-end', function () {
            $httpBackend.expectGET('http://localhost:3000/jobs').respond([]);

            dataSource.getJobs().then(function (response) {
                expect(response).to.be.empty;
            });
        });

    });

});
