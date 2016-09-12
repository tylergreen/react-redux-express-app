var express = require('express'),
    path = require('path'),
    config = require('config'),
    setupPassport = require('./setupPassport'),
    flash = require('connect-flash'),
    appRouter = require('./routers/appRouter.js')(express),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    expressJwt = require('express-jwt'),
    db = require('./model/models')

var app = express()

app.set('views', __dirname + '/views')

app.use(jsonParser)
app.use(bodyParser.urlencoded({
  extended: true
}))

setupPassport(app)  // is there a better way to do this?
 
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/styles', express.static(path.join(__dirname, '/styles')))

app.use('/', appRouter)

db.sync().then(() => app.listen(config.get('port')))

console.log(`Server started on port ${config.get('port')}`)

module.exports = app
