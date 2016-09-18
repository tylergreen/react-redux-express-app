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
            model.User.findOne({
                where: {'id': jwt_payload.user_id}
            }).then(user => {
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Bad Token'})
                }
            })
        }))

    passport.use(model.User.createStrategy())
    
    passport.serializeUser(
        model.User.serializeUser()
    )

    passport.deserializeUser(
        model.User.deserializeUser()
    )
}
