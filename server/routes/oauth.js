var config = require('../app.config');

var express = require('express');
var request = require('request');
var qs = require('querystring');

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
            var openIdUrl = config.api.google.url + '/people/me/openIdConnect';
            var headers = {
                Authorization: 'Bearer ' + accessToken
            };

            request.get({ url: openIdUrl, headers: headers, json: true }, function (err, response, profile) {
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




router.route('/github')
    .post(function (req, res) {
        var accessTokenUrl = config.auth.github.url;
        var userApiUrl = config.api.github.url;

        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: config.auth.github.secret,
            redirect_uri: req.body.redirectUri
        };

        request.get({ url: accessTokenUrl, qs: params }, function (err, response, accessToken) {
            accessToken = qs.parse(accessToken);
            var headers = { 'User-Agent': 'Satellizer' };

            request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, function (err, response, profile) {
                User.findOne({ githubId: profile.id }, function (err, user) {
                    if (user) {
                        return responseSender.createAndSendToken(user, res);
                    }

                    var newUser = new User();
                    newUser.githubId = profile.id;
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
