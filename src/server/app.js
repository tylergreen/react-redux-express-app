// application

var express = require('express'),
    app = express(),
    setupHandlebars  = require('./setupHandlebars.js')(app),
    setupPassport = require('./setupPassport'),
    flash = require('connect-flash'),
    appRouter = require('./routers/appRouter.js')(express),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    jsonParser = bodyParser.json()

var port = process.env.PORT || 8080

app.use(cookieParser())
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }))

app.use('/styles', express.static(__dirname + '/styles'))
app.set('views', __dirname + '/views')

app.use(flash())
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash('error')
    next()
});

app.use(jsonParser)
app.use(bodyParser.urlencoded({
  extended: true
}))

setupPassport(app)

app.use('/', appRouter)

// start app
app.listen(port)
console.log('Server started on port ' + port)

module.exports.getApp = app
