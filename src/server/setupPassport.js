var passport = require('passport')
var config = require('config')
var LocalStrategy = require('passport-local').Strategy
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt  = require('passport-jwt').ExtractJwt
var bcrypt = require('bcrypt')
var model = require('./model/models.js')

module.exports = (app) => {

    app.use(passport.initialize())
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: config.get("jwt-secret-key")
    }
    
    passport.use(new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log('jwt payload is')
            console.log(jwt_payload)
            model.user.findOne({
                where: {'id': jwt_payload.user_id}
            }).then(user => {
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Bad Token'})
                }
        })
    }))
    
    passport.use(new LocalStrategy(
        {
//            passReqToCallback: true,
            session: false
        },
    function(email, password, done) {
      model.user.findOne({
        where: {
          'email': email  // make this an index
        }
      }).then(function (user) {
        if (user == null) {
          return done(null, false, { message: 'Incorrect credentials.' })
        }
        
        var hashedPassword = bcrypt.hashSync(password, user.salt)
        
        if (user.password === hashedPassword) {
          return done(null, user)
        }
        
        return done(null, false, { message: 'Incorrect credentials.' })
      })
    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    model.user.findOne({
      where: {
        'id': id
      }
    }).then(function (user) {
      if (user == null) {
        done(new Error('Wrong user id.'))
      }
      
      done(null, user)
    })
  })
}
