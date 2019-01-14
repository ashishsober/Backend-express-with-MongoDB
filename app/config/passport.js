
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');
var empDatabase = require('../controllers/employee-vrd/employee.controller');
passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientId,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.redirect
        },(token, refreshToken, profile, done) => {
            console.log("my token data-----------"+token);
            profile.accessToken = token;
            empDatabase.postEmployee(profile,done);
            return done(null,profile);
        }
));