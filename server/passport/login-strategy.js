var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

var strategyOptions = {
	usernameField: 'email'
};

module.exports = new LocalStrategy(strategyOptions, function (email, password, done) {
	var findQuery = {
		email: email
	};

	User.findOne(findQuery, function (err, user) {
		if (err) {
			return done(err);
		}

		if (!user) {
			return done(null, false, {
				message: 'Wrong e-mail/password'
			});
		}

		user.comparePasswords(password, function (err, isMatch) {
			if (!isMatch) {
				return done(null, false, {
					message: 'Wrong e-mail/password'
				});
			}

			done(null, user);
		});
	});
});
