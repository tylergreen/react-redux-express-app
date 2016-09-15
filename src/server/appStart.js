var App = require('./app.js'),
    DB = require('./model/models'),
    config = require('config')

var port = process.env.PORT || config.get('port')

console.log(`Server started on port ${config.get('port')}`)
DB.sync().then(() => App.listen(port))
