var passport = require('passport'),
    config = require('config'),
    timerController = require('../controllers/timerController.js'),
    userController = require('../controllers/userController.js'),
    jwt = require('jsonwebtoken'),
    Model = require('../model/models.js')

module.exports = function(express) {
    var router = express.Router()

    var JWTAuthentication = passport.authenticate('jwt', {session:false})

    router.post('/signup', userController.signup)
    router.post('/recordTimer',
                JWTAuthentication,
                timerController.record)

    router.post('/timings',
                JWTAuthentication,
               timerController.timings)

    router.post('/edit-profile',
                JWTAuthentication,
                userController.editProfile)
    
    router.post('/login',
                passport.authenticate('local'),
                userController.login)

    router.get('/', function(req, res) {
        res.render('home')
    })
    
  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

  return router
}
