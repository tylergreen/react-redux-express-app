var Sequelize = require('sequelize')

var attributes = {
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  firstName: {
      type: Sequelize.STRING,
      max: 128
  },
  lastName: {
      type: Sequelize.STRING,
      max: 128
  }
}

var options = {
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options
