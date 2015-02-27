var program = require('commander-plus');

module.exports = function (args) {

    program
        .description('API for JFinder application')
        .version('0.0.1')
        .option('-p, --port [port]', 'Select port number', 3005)
        .option('-e, --email [email]', 'Select an application e-mail address', 'service@jfinder.com')
        .option('-P, --pass', 'Custom e-mail password')

        .parse(args);

    return program;

};
