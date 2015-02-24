(function () {

	'use strict';

	angular.module('app.security').factory('login', login);

	login.$inject = ['$http', '$window', '$q', 'authToken', 'settings'];

	function login($http, $window, $q, authToken, settings) {
		var service = function (email, password) {
			return $http.post(service.host + '/login', {email: email, password: password})
				.then(loginSuccess);
		};

		service.host = settings.api.host;

		service.withGoogle = loginWithGoogle;

		return service;

		function loginSuccess(data) {
			var response = data.data;
			authToken.setToken(response.token);
			return response;
		}

		function loginWithGoogle() {
			var deferred = $q.defer();

			var params = [];
			params.push('response_type=code');
			params.push('client_id=' + settings.google.clientid);
			params.push('redirect_uri=' + $window.location.origin);
			params.push('scope=email profile');

			var options = 'width=500, height=500, left=' + ($window.outerWidth - 500) / 2 + ', top=' + ($window.outerHeight - 500) / 2.5;

			var popup = $window.open(settings.google.url + '?' + params.join('&'), '', options);
			$window.focus();

			$window.addEventListener('message', function (event) {
				if ($window.location.origin === event.origin) {
					var code = event.data;
					popup.close();

					$http.post(service.host + '/auth/google', {
						code: code,
						clientId: settings.google.clientid,
						redirectUri: $window.location.origin
					}).then(function (data) {
						deferred.resolve(loginSuccess(data));
					});
				}
			});

			return deferred.promise;
		}
	}

})();
