var express = require('express');
var passport = require('passport');

var responseSender = require('../utils/response-sender');

var router = express.Router();

router.route('')
	.post(passport.authenticate('local-login'), function (req, res) {
		responseSender.createAndSendToken(req.user, res);
	});

module.exports = router;
