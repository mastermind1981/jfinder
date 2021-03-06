var jwt = require('jwt-simple');
var moment = require('moment');

var config = require('../app.config');

exports.sendErrorResponse = function (code, message, res) {
    res.status(code).json({
        status: 'error',
        message: message,
        date: new Date()
    });
};

exports.createAndSendToken = function (user, res) {
    var payload = {
        sub: user.id,
        exp: moment().add(10, 'days').unix()
    };

    var token = jwt.encode(payload, config.jwt.secret);

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
};
