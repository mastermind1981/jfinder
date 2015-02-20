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
		if (user) {
			return done(null, false, {
				message: 'User already exists in the system'
			});
		}

		var user = new User({
			email: email,
			password: password
		});

		user.save(function (err) {
			if (err) {
				return done(err);
			}

			return done(null, user);
		});
	});
});
