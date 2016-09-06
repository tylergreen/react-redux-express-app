var Sequelize = require('sequelize')

var attributes = {
    label: {
        type: Sequelize.STRING,
        // can we limit the length?
    },

    lapTime: {
        type: Sequelize.DATE,
    }
}
