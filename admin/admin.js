var User = require('../models/user');

var userModel = User.model; // get the model compiled

// register the module to be displaied in admin
module.exports = {
    user: userModel,
}
