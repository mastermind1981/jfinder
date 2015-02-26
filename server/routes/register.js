var config = require('../app.config');

var jwt = require('jwt-simple');
var express = require('express');
var passport = require('passport');

var emailChecker = require('../services/email-checker');
var responseSender = require('../utils/response-sender');

var User = require('../models/user');

var router = express.Router();

router.route('')
    .post(passport.authenticate('local-register'), function (req, res) {
        emailChecker.send(req.user.email);
        responseSender.createAndSendToken(req.user, res);
    });

router.route('/verification')
    .get(function (req, res) {
        var token = req.query.token;

        var payload = jwt.decode(token, config.jwt.secret);
        var email = payload.sub;

        if (!email) return responseSender.sendErrorResponse(401, 'You are unauthorized', res);

        User.findOne({ email: email }, function (err, user) {
            if (err) return res.status(500);

            if (!user) return responseSender.sendErrorResponse(500, 'Unable to find user', res);

            user.active = true;
            user.save(function (err) {
                if (err) return res.status(500);
                return res.redirect(config.client.url);
            });
        });
    });

module.exports = router;
