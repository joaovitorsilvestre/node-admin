var User = require('../models/user');
var Pessoa = require('../models/pessoa');

var userModel = User.model; // get the model compiled
var pessoaModel = Pessoa.model

// register the module to be displaied in admin
module.exports = {
    user: userModel,
    pessoa: pessoaModel
}
