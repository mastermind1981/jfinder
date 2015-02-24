var config = require('../app.config');

var express = require('express');
var request = require('request');

var User = require('../models/user');
var responseSender = require('../utils/response-sender');

var router = express.Router();

router.route('/google')
	.post(function (req, res) {

		var params = {
			client_id: req.body.clientId,
			redirect_uri: req.body.redirectUri,
			code: req.body.code,
			grant_type: 'authorization_code',
			client_secret: config.auth.google.secret
		};

		request.post(config.auth.google.url, { json: true, form: params }, function (err, response, token) {
			var accessToken = token.access_token;
			var headers = { Authorization: 'Bearer ' + accessToken };

			request.get({
				url: config.api.google.url + '/people/me/openIdConnect',
				headers: headers,
				json: true
			}, function (err, response, profile) {
				User.findOne({ googleId: profile.sub }, function (err, user) {
					if (user) {
						return responseSender.createAndSendToken(user, res);
					}

					var newUser = new User();
					newUser.googleId = profile.sub;
					newUser.displayName = profile.name;
					newUser.save(function (err) {
						if (err) {
							return responseSender.sendErrorResponse(500, 'Could not create new user', res);
						}

						return responseSender.createAndSendToken(newUser, res);
					});
				});
			});
		});

	});

module.exports = router;
