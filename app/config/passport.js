
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');
passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientId,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.redirect
        },(token, refreshToken, profile, done) =>{
            console.log("my google data-----------"+profile);
            return done(profile);
                       //process.nextTick(function() {});
        }
));