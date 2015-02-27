var config = require('../app.config');
var nodemailer = require('nodemailer');

exports.send = function (sender, receivers, subject, html) {
    var transporter = getTransporter();

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

function getTransporter() {
    return nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.email.host.user,
            pass: config.email.host.pass
        }
    });
}
