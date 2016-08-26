var UserMeta = require('./user.js'),
    TimeRecordMeta = require('./timeRecord.js'),
    Sequelize = require('sequelize')

if(process.env.DATABASE_URL){
    var match = process.env.DATABASE_URL.split(":"),
        
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect:  'postgres',
        protocol: 'postgres',
        port: match[3].split("/")[0],
        host: match[2],
        logging:  true
            
    })
} else {

    sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/example')
}

module.exports = sequelize

var User = sequelize.define('Users', UserMeta.attributes, UserMeta.options)

var TimeRecord = sequelize.define('TimeRecords', TimeRecordMeta.attributes, TimeRecordMeta.options)

// you can define relationships here
User.hasMany(TimeRecord)
TimeRecord.belongsTo(User)


module.exports.User = User
module.exports.TimeRecord = TimeRecord
