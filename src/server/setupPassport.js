var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    Model = require('./model/models.js')

module.exports = function(app) {
  app.use(passport.initialize())
//  app.use(passport.session())

    var JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
    opts.secretOrKey = "SUPER-UNGUESSABLE-SECRET" // this is defined in 2 different places. Move to a single config (appRouter.js has the other)
    // opts.issuer = "accounts.examplesoft.com";
    //opts.audience = "yoursite.net";
    passport.use(new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log('jwt payload is')
            console.log(jwt_payload)
            Model.User.findOne({
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
    function(username, password, done) {
      Model.User.findOne({
        where: {
          'username': username
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
    Model.User.findOne({
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
