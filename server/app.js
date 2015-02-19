var config = require('./app.config');

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var cors = require('./middleware/cors');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://' + config.db.user + ':' + config.db.password + '@ds045031.mongolab.com:45031/' + config.db.name);

app.use(bodyParser.json());
app.use(cors);
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

var strategyOptions = { usernameField: 'email' };

var loginStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {
    User.findOne({email: email}, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            console.log('here');
            return done(null, false, { message: 'Wrong e-mail/password' });
        }

        user.comparePasswords(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false, { message: 'Wrong e-mail/password' });
            }

            done(null, user);
        });
    });
});

var registerStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {

    User.findOne({email: email}, function (err, user) {
        if (user) {
            return done(null, false, { message: 'User already exists in system' });
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

passport.use('local-login', loginStrategy);
passport.use('local-register', registerStrategy);

app.get('/jobs', function (req, res) {
    if (!req.headers.authorization) {
        res.status(403).json({ status: 'error', message: 'You do not have access for that resource', date: new Date() });
    } else {
        var token = req.headers.authorization.split(' ')[1];
        var payload = jwt.decode(token, config.jwt.secret);

        if (!payload.sub) {
            res.status(401).json({ status: 'error', message: 'Authentication failed', date: new Date() });
        } else {
            res.status(200).json(['Front-end Developer', 'Java Developer', 'Junior UX Designer', 'Senior JavaScript Developer']);
        }
    }
});

app.post('/register', passport.authenticate('local-register'), function (req, res) {
    createAndSendToken(req.user, res);
});

app.post('/login', passport.authenticate('local-login'), function (req, res) {
    createAndSendToken(req.user, res);
});

var server = app.listen(process.env.PORT || 3005, function () {
    console.log('Server is listing on port: ' + server.address().port);
});


function createAndSendToken(user, res) {
    var payload = {
        sub: user.id
    };

    var token = jwt.encode(payload, config.jwt.secret);

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
}
