(function () {

	'use strict';

	angular.module('app.security').run(run);

	run.$inject = ['$window'];

	function run($window) {

		var params = $window.location.search.substring(1);

		if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
			var pair = params.split('=');
			var code = decodeURIComponent(pair[1]);

			$window.opener.postMessage(code, $window.location.origin);
		}

	}

})();
