var config = require('../app.config');
var mailer = require('./mailer');
var program = require('./program')(process.argv);

var jwt = require('jwt-simple');
var fs = require('fs');
var _ = require('underscore');

var model = {
    verifyUrl: config.email.verify.url,
    title: config.email.verify.model.title,
    subTitle: config.email.verify.model.subTitle,
    body: config.email.verify.model.body
};

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

function sendEmail(email) {
    var payload = {
        sub: email
    };

    var token = jwt.encode(payload, config.jwt.secret);

    mailer.send(program.email, email, 'Account Verification', getHtml(token));
}

function getHtml(token) {
    var templatePath = 'views/email-template.html';
    var html = fs.readFileSync(templatePath, { encoding: 'utf8' });

    model.verifyUrl += token;

    var template = _.template(html);
    return template(model);
}

exports.send = sendEmail;
