var config = require('../app.config');
var crypto = require('crypto');


exports.encode = function (payload, secret) {
    var header = {typ: 'JWT', alg: config.jwt.algorithm};

    var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
    jwt += '.' + sign(jwt, secret);

    return jwt;
}

function sign(str, key) {
    return crypto.createHmac('sha256', key).update(str).digest('base64');
}

function base64Encode(str) {
    return new Buffer(str).toString('base64');
}
