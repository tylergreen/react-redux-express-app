// application

var express = require('express'),
    path = require('path'),
    config = require('config'),
    app = express(),
    setupHandlebars  = require('./setupHandlebars.js')(app),
    setupPassport = require('./setupPassport'),
    flash = require('connect-flash'),
    appRouter = require('./routers/appRouter.js')(express),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    jsonParser = bodyParser.json(),
    expressJwt = require('express-jwt')

var port = config.get('port');

app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/styles', express.static(path.join(__dirname, '/styles')))
app.set('views', __dirname + '/views')

app.use(jsonParser)
app.use(bodyParser.urlencoded({
  extended: true
}))

setupPassport(app)  // is there a better way to do this?

app.use('/', appRouter)

// start app
app.listen(port)
console.log('Server started on port ' + port)

module.exports.getApp = app
