var passport = require('passport'),
    signupController = require('../controllers/signupController.js'),
    jwt = require('jsonwebtoken'),
    Model = require('../model/models.js')

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

    router.get('/protected',
                passport.authenticate('jwt', {session: false}), // can we configure session to be false?
                (req, res) => {
                    res.send('TYLOR RULEZ DUH')
                }
              )

    router.post('/edit-profile',
                passport.authenticate('jwt', {session: false}),
                (req, res) => {
                    // update profile in the DB
                    // find the user
                    // update the user fields
                    // send back the user like in login
                    console.log("req body")
                    console.log(req.body)
                    console.log("req body")
                    console.log(req.user)
                    //                    res.send('OK success')
                    // update a the fields to test but don't save to DB yet
                    Model.User.upsert(
                        {   id: req.user.id,
                            username: req.user.username,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email
                        }).catch(err => {
                            console.log("upsert error")
                            console.log(err)
                        })
           
                    var user = Object.assign({}, req.user.dataValues, { firstName: req.body.firstName,
                                                                     lastName: req.body.lastName,
                                                                     email: req.body.email
                                                                   })
                    
                    console.log("updated_user ")
                    console.log(user)

                    res.json({user: user})
                }
               )
    
  router.post('/login',
                passport.authenticate('local'),
                function(req, res) {
                    // send JWT
                    console.log("REQ USER OBJECT")
                    console.log(req.user)
                    var profile = {
                        user_id: req.user.id,
                    }
                    // configure this properly
                    var secret = "SUPER-UNGUESSABLE-SECRET"  
                  var token = jwt.sign(profile, secret, {expiresInMinutes: 30}); // configure better
                    res.json({user: req.user, token: token})
              }
               )

    router.post('/echo',
                (req, res) => {
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
