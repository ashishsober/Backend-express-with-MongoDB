
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var configAuth = require('./auth');
var empDatabase = require('../controllers/employee-vrd/employee.controller');
import { googleConfig } from './auth'

passport.use(new GoogleStrategy({
        clientID        : googleConfig.clientId,
        clientSecret    : googleConfig.clientSecret,
        callbackURL     : googleConfig.redirect
        },(token, refreshToken, profile, done) => {
            console.log("my token data-----------"+token);
            profile.accessToken = token;
            empDatabase.postEmployee(profile,done);
            return done(null,profile);
        }
));