var Sequelize = require('sequelize')

var attributes = {
    label: {
        type: Sequelize.STRING,
        // can we limit the length?
    },

    startTime: {
        type: Sequelize.DATE,
    },

    duration: {
        type: Sequelize.INTEGER,
    }
}

var options = {
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options


