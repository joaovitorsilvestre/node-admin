var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const db = mongoose.connection;

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    relatedAdminName: {
        type: String,
        require: true
    }
});

UserSchema.methods.passwordMatch = function(password){
    var match = bcrypt.compareSync(password, this.password);
    return match;
};

// OBS: es6 Arrow Function doesnt work in the follows !!
UserSchema.pre('save', function(next) {
    this.relatedAdminName = this.username;
    next();
});

var User = db.model('User', UserSchema);

exports.model = User;

exports.create = function(username, password, callback) {
    var newUser = new User({
        username: username,
        password: password
    });

    newUser.save( (err) => {
        if (err) {
            callback(err);
        } else {
            callback();
        };
    });
};

exports.findAll = function(callback) {
    User.find({}, (err, users) => {
        if (err) return callback(err);

        return callback(null, users);
    })
};
