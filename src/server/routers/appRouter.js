var passport = require('passport'),
    config = require('config'),
    signupController = require('../controllers/signupController.js'),
    jwt = require('jsonwebtoken'),
    Model = require('../model/models.js')

module.exports = function(express) {
  var router = express.Router()

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
                    // fix this so any param not supplied will default to existing
                    var firstName = req.body.firstName || req.user.firstName
                    var lastName = req.body.lastName || req.user.lastName
                    var email = req.body.email || req.user.email
                    
                    Model.User.upsert(
                        {   id: req.user.id,
                            firstName: firstName,
                            lastName: lastName,
                            email: email
                        }).catch(err => {
                            console.log("upsert error")
                            console.log(err)
                        })
           
                            var user = Object.assign({}, req.user.dataValues, { firstName: firstName,
                                                                                lastName: lastName,
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

                    // partially apply jwt.sign into util or helper
                    var secret = config.get("jwt-secret-key")
                    var jwtExpiration = config.get("jwt-expiration")
                    var token = jwt.sign(profile,
                                         secret,
                                         jwtExpiration);
                    res.json({user: req.user, token: token})
                }
             )

    router.get('/echo',
               (req, res) => {
                   console.log("Debug output")
                   console.log(req)
                   console.log(req.body)
                   res.send("hi friend") 
               })

    router.get('/', function(req, res) {
        res.render('home')
    })
    
  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

  return router
}
