/**
 * Created by sanchitgupta001 on 02/06/18.
 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Google OAuth Strategy
const mongoose = require('mongoose');
const keys = require('../config/keys');

// Note: Here, we are passing single argument to mongoose.model. That means we are trying to fetch something out of mongoose
const User = mongoose.model('users'); // This is a Model Class

// Used for serialization the user for cookie creation
passport.serializeUser((user, done) => { // user is the same user record we pulled from mongoDB
  done(null, user.id); // Here, 'id' is the mongoID from mongo db. (Identifies user from database)
  // Note: Here, we are using mongoId bcoz we are not sure that login will always be from google. User can signup/in using
  // facebook, etc. also. (In Future, we can implement different logins using passport itself)
});

// Used for deserializing the id saved in cookie, to check if user session is there in cookie
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true // By default Strategy assumes that if our request from browser ever went through any kind of proxy, then request could no longer be 'https'
    },            // In our case it goes through Heroku Proxy. So, by setting proxy to true, we tell Strategy that if our request goes through any proxy, trust the proxy and deal with it.
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            // we already have record with given profile ID
            done(null, existingUser); // first arg: errorObject, second arg: user record
          } else {
            // we don't have record associated with this profile ID. Create New User
            new User({ googleId: profile.id }) // This will create a new Model Instance and save into the mongoDB
              .save()
              .then(user => done(null, user));
          }
        });
    })
);
