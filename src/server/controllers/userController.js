var model = require('../model/models.js'),
    config = require('config'),
    jwt = require('jsonwebtoken'),
    ms = require('ms')

module.exports.editProfile = function(req, res) {
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


module.exports.signup = function(req, res) {
    var email = req.body.email,
        password = req.body.password
   
  if (!email || !password) {
      res.json({'error': 'supply email and password'})
  }

    model.User.register(email, password, (err, user) => {
        if(err){
            console.log(err)
            res.json({'error': err}) // should just respond with 500
        }
        else {
        
        var server_profile = {
            user_id: user.id,
        }

        var client_profile = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
        
        // refactor into util or helper
        var secret = config.get("jwt-secret-key")
        var jwtExpiration = config.get("jwt-expiration")
        var token = jwt.sign(server_profile, secret, jwtExpiration);
            res.json({user: client_profile, token: token})
        }
    })
}




module.exports.login = function(req, res) {

    // send JWT
    console.log("REQ USER OBJECT")
    console.log(req.user)
    var profile = {
        user_id: req.user.id,
    }

    // partially apply jwt.sign into util or helper
    var secret = config.get("jwt-secret-key")
    var jwtExpiration = config.get("jwt-expiration")
    var jwtExpirationMilliseconds = ms(jwtExpiration.expiresIn)
    var token = jwt.sign(profile,
                         secret,
                         jwtExpiration);
    console.log("jwtExpirationMilliseconds")
    console.log(jwtExpirationMilliseconds)
    res.json({user: req.user,
              token: token,
              tokenDuration: jwtExpirationMilliseconds
             })
}

