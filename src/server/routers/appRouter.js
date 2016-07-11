var passport = require('passport'),
    signupController = require('../controllers/signupController.js'),
    jwt = require('jsonwebtoken')

module.exports = function(express) {
  var router = express.Router()

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next()
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }
  
  router.get('/signup', signupController.show)
  router.post('/signup', signupController.signup)

    router.post('/login',
                passport.authenticate('local'),
                function(req, res) {
                    // send JWT
                    console.log("REQ USER OBJECT")
                    console.log(req.user)
                    var profile = {
                        user_id: req.user.id
                    }
                    // configure this properly
                    var secret = "SUPER-UNGUESSABLE-SECRET"  
                  var token = jwt.sign(profile, secret, {expiresInMinutes: 30}); // configure better
                    res.json({user: req.user, token: token})
              }
               )

    router.post('/echo',
                function(req, res) {
                    console.log("Debug output")
                    console.log(req)
                    console.log(req.body)
                    res.send("hi friend") 
                })

  router.get('/', function(req, res) {
    res.render('home')
  })

  router.get('/dashboard', isAuthenticated, function(req, res) {
    res.render('dashboard')
  })

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

  return router
}
