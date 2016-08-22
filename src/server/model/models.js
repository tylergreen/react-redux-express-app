var UserMeta = require('./user.js'),
    connection = require('../sequelize.js')

var User = connection.define('Users', UserMeta.attributes, UserMeta.options)

// you can define relationships here

module.exports.User = User
