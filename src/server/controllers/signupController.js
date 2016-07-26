var bcrypt = require('bcrypt'),
    Model = require('../model/models.js')

module.exports.signup = function(req, res) {
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

    Model.User.create(newUser).then((user) => {
        var profile = {
            user_id: user.id,
        }

        // refactor into util or helper
        var secret = config.get("jwt-secret-key")
        var jwtExpiration = config.get("jwt-expiration")
        var token = jwt.sign(profile, secret, jwtExpiration);
        
        res.json({user: user, token: token})
    }
                                   ).catch(function(error) {
                                       res.json({'error': error})
                                   })
                                       }
