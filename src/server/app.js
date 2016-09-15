var express = require('express'),
    path = require('path'),
    setupPassport = require('./setupPassport'),
    flash = require('connect-flash'),
    appRouter = require('./routers/appRouter.js')(express),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    expressJwt = require('express-jwt'),
    app = express()

app.set('views', __dirname + '/views')

app.use(jsonParser)
app.use(bodyParser.urlencoded({
  extended: true
}))

setupPassport(app)  // is there a better way to do this?
 
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/styles', express.static(path.join(__dirname, '/styles')))

app.use('/', appRouter)

// just not sure how to do this better for heroku

module.exports = app
