var express = require('express');

var jwt = require('jwt-simple');

var config = require('../app.config');
var responseSender = require('../utils/response-sender');

var router = express.Router();

router.route('')
    .get(function (req, res) {
        if (!req.headers.authorization) {
            return responseSender.sendErrorResponse(403, 'You do not have access for that resource', res);
        }

        var payload = getPayload(req);

        if (!payload.sub) {
            return responseSender.sendErrorResponse(401, 'Authentication failed', res);
        }

        res.status(200).json(config.data.jobs);
    });

module.exports = router;

function getPayload(req) {
    var token = req.headers.authorization.split(' ')[1];
    return jwt.decode(token, config.jwt.secret);
}
