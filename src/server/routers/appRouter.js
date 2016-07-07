var passport = require('passport'),
    signupController = require('../controllers/signupController.js')

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
                    res.send("Succssefully authentiated yay!")
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
