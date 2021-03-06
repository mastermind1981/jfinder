var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = Schema({
    email: String,
    password: String,
    googleId: String,
    githubId: String,
    displayName: String,
    active: Boolean
});

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });

});

userSchema.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};

userSchema.methods.comparePasswords = function (password, callback) {
    return bcrypt.compare(password, this.password, callback);
};

userSchema.statics.findFullAuthorized = function (query, callback) {
    query.active = true;
    this.findOne(query, callback);
};


module.exports = mongoose.model('User', userSchema);
