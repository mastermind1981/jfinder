(function () {

    'use strict';

    angular.module('app.core').directive('equals', equals);

    function equals() {
        var directive = {
            require: 'ngModel',
            restrict: 'A',
            link: link
        };
        return directive;

        function link(scope, element, attrs, ngModelCtrl) {
            var validate = function (value) {
                var isValid = (value === scope.$eval(attrs.equals));
                ngModelCtrl.$setValidity('equal', isValid);
                return isValid ? value : undefined;
            };

            ngModelCtrl.$parsers.push(validate);
            ngModelCtrl.$formatters.push(validate);

            scope.$watch(attrs.equals, function () {
                ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
            });
        }
    }

})();
