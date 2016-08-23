var UserMeta = require('./user.js'),
    Sequelize = require('sequelize')

if(process.env.DATABASE_URL){
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect:  'postgres',
        protocol: 'postgres',
        port: 5432, // match[4],
        host: "i5-gU3wSLs20-HI19I-bxTSjj4@ec2-184-73-202-229.compute-1.amazonaws.com",
        logging:  true //false
            
    })
} else {
    
    sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/example')
}

module.exports = sequelize

var User = connection.define('Users', UserMeta.attributes, UserMeta.options)

// you can define relationships here

module.exports.User = User
