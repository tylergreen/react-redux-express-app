var bcrypt = require('bcrypt'),
    model = require('../model/models.js'),
    config = require('config'),
    jwt = require('jsonwebtoken')

module.exports.signup = function(req, res) {
    console.log("Req is")
    console.log(reg)
    var email = req.body.email
    var password = req.body.password
   
  if (!email || !password) {
      res.json({'error': 'supply email and password'})
  }
  
  var salt = bcrypt.genSaltSync(10)
  var hashedPassword = bcrypt.hashSync(password, salt)
  
    var newUser = {
        email: email,
        salt: salt,
        password: hashedPassword
    }

    model.User.create(newUser).then((user) => {
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
                                   ).catch(function(error) {
                                       console.log(error)
                                       res.json({'error': error} // should just respond with 500
                                               )
                                   })
                                       }
