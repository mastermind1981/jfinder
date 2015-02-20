var config = require('./app.config');

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

/* --- ROUTES --- */
var jobsRoutes = require('./routes/jobs');
var loginRoutes = require('./routes/login');
var registerRoutes = require('./routes/register');

/* --- PASSPORT STRATEGIES --- */
var loginStrategy = require('./passport/login-strategy');
var registerStrategy = require('./passport/register-strategy');

/* --- CUSTOM MIDDLEWARES --- */
var cors = require('./middleware/cors');

var app = express();

app.use(bodyParser.json());
app.use(cors);
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.use('local-login', loginStrategy);
passport.use('local-register', registerStrategy);

app.use('/jobs', jobsRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);


mongoose.connect('mongodb://' + config.db.user + ':' + config.db.password + '@ds045031.mongolab.com:45031/' + config.db.name);

var server = app.listen(process.env.PORT || 3005, function () {
	console.log('Server is listing on port: ' + server.address().port);
});
