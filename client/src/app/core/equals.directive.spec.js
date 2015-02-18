describe('Directives', function () {

    var scope, form;

    beforeEach(module('app.core'));

    beforeEach(function () {
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();

            var element = angular.element(
                '<form name="form">' +
                    '<input name="value1" ng-model="value1">' +
                    '<input name="value2" ng-model="value2" equals="value1">' +
                '</form>'
            );

            $compile(element)(scope);
            form = scope.form;
        });
    });

    describe('Equals directive', function () {

        it('should not pass with different value 1 and value 2', function () {
            form.value1.$setViewValue('value1');
            form.value2.$setViewValue('value2');

            scope.$digest();

            expect(form.value2.$dirty).to.be.true;
            expect(form.value2.$error.equal).to.be.true;
        });

        it('should pass with the same values', function () {
            form.value1.$setViewValue('value1');
            form.value2.$setViewValue('value1');

            scope.$digest();

            expect(form.value2.$dirty).to.be.true;
            expect(form.value2.$error.equal).to.be.undefined;
        });

    });

});
