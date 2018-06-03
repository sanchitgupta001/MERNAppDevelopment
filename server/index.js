/**
 * Created by sanchitgupta001 on 01/06/18.
 */
const express = require('express'); // 'require': Common JS module format for nodeJS, 'import': ES 2015 module format, used in React
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
require('./models/user'); // Note: Here, order of the require statement matters
require('./services/passport'); // It is not returning anything. So, we only want it to execute it.

// Connecting mongoose to mongodb on mlab.com
mongoose.connect(keys.mongoURI, (err, db) => {
  if (err) {
    console.log('err', err);
  }
  else { console.log('Connected to MongoDB')}
});

/*
By calling 'express' as a function, it generates a new application that represents a running express app.
'app' object is used to setup configuration, that will listen to incoming request that are being routed to express side of the app from node side
and then route those requests to different route handlers.
Consult TechStack.xml in draw.io for more info.
*/
const app = express();

// Enabling cookie for the app
app.use(
  cookieSession({ // accepts config object
    maxAge: 30 * 24 * 60 * 60 * 1000, // how long cookie can exist in the browser before it automatically expires (here 30 days)
    keys: [keys.cookieKey] // Key to encrypt the cookie (can be multiple)
,  })
);
// connecting session to passport
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// Dynamic Port Binding
const PORT = process.env.PORT || 5000; // Heroku has the ability to inject Environment variables (for current environment on which NODE is running)

app.listen(PORT); // tell express to listen to port 5000

