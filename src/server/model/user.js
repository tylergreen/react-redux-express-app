var Sequelize = require('sequelize')

var attributes = {
  username: {
    type: Sequelize.STRING,
    validate: {
      is: /^[a-z0-9\_\-]+$/i,
    }
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
  },
  password: {
      type: Sequelize.STRING,
      max: 24
  },
  salt: {
    type: Sequelize.STRING
  }
}

var options = {
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options
