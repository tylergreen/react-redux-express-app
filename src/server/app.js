var express = require('express'),
    path = require('path'),
    config = require('config'),
    setupPassport = require('./setupPassport'),
    flash = require('connect-flash'),
    appRouter = require('./routers/appRouter.js')(express),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    jsonParser = bodyParser.json(),
    expressJwt = require('express-jwt'),
    db = require('./model/models')

var app = express()

app.use(jsonParser)
app.use(bodyParser.urlencoded({
  extended: true
}))

setupPassport(app)  // is there a better way to do this?

app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/styles', express.static(path.join(__dirname, '/styles')))
app.use('/', appRouter)
app.set('views', __dirname + '/views')
app.set('port', process.env.PORT || 8080)



db.sync().then(() => app.listen(app.get('port')))

console.log(`Server started on port ${app.get('port')}`)

module.exports.getApp = app
