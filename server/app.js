var config = require('./app.config');

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('./middleware/cors');

var jwt = require('./services/jwt');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://' + config.db.user + ':' + config.db.password + '@ds045031.mongolab.com:45031/' + config.db.name);

app.use(bodyParser.json());
app.use(cors);

app.get('/jobs', function (req, res) {
	if (!req.headers.authorization) {
		res.status(403).json({ status: 'error', message: 'You do not have access for that resource', date: new Date() });
	} else {
		res.status(200).json(['Front-end Developer', 'Java Developer', 'Junir UX Designer', 'Senior JavaScript Developer']);
	}
});

app.post('/register', function (req, res) {
	var user = new User({
		email: req.body.email,
		password: req.body.password
	});

	user.save(function (err) {
		if (err) {
			res.status(500).json({ status: 'error', message: err.message, date: new Date() });
		}

		var payload = {
			iss: req.hostname,
			sub: req._id
		};

		var token = jwt.encode(payload, config.jwt.secret);

		res.status(200).send({
			user: user.toJSON(),
			token: token
		});
	});
});

var server = app.listen(process.env.PORT || 3005, function () {
	console.log('Server is listing on port: ' + server.address().port);
});
