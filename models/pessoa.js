var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const db = mongoose.connection;

var PessoaSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    created : {
        type: Date
    },
    relatedAdminName: {
        type: String,
        require: true
    }
});

PessoaSchema.methods.passwordMatch = function(password){
    var match = bcrypt.compareSync(password, this.password);
    return match;
};

// OBS: es6 Arrow Function doesnt work in the follows !!
PessoaSchema.pre('save', function(next) {
    this.relatedAdminName = this.username;
    next();
});

var Pessoa = db.model('Pessoa', PessoaSchema);

exports.model = Pessoa;

exports.create = function(username, password, callback) {
    var newUser = new Pessoa({
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
    Pessoa.find({}, (err, users) => {
        if (err) return callback(err);

        return callback(null, users);
    })
};
