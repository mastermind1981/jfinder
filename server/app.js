var config = require('./app.config');
var program = require('./services/program')(process.argv);

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var commander = require('commander-plus');


/* --- ROUTES --- */
var jobsRoutes = require('./routes/jobs');
var loginRoutes = require('./routes/login');
var oauthRoutes = require('./routes/oauth');
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
app.use('/auth', oauthRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);


mongoose.connect('mongodb://' + config.db.user + ':' + config.db.password + '@ds045031.mongolab.com:45031/' + config.db.name);

var server = app.listen(process.env.PORT || program.port, function () {
    cleanConsole();

    if (program.pass) {
        commander.password('\nEnter e-mail password: ', '*', function (pass) {
            config.email.host.pass = pass;
            process.stdin.destroy();
            cleanConsole('Server is listing on port: ' + server.address().port);
        });
    } else {
        cleanConsole('Server is listing on port: ' + server.address().port);
    }
});


function cleanConsole(message) {
    process.stdout.write("\u001b[2J\u001b[0;0H");
    if (message) console.log(message);
}
