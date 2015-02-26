var config = require('../app.config');
var nodemailer = require('nodemailer');
var program = require('commander');

// todo: handle information about an e-mail host from command line or from external file

var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.email.host.user,
            pass: config.email.host.pass
        }
    });

exports.send = function (sender, receivers, subject, html) {

    var mailOptions = {
        from: 'JFinder Team <' + sender + '>',
        to: Array.isArray(receivers) ? receivers.join() : receivers,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Message sent: ' + info.response);
    });

};
