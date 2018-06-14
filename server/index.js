/**
 * Created by sanchitgupta001 on 01/06/18.
 */
const express = require('express'); // 'require': Common JS module format for nodeJS, 'import': ES 2015 module format, used in React
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); // Note: Here, order of the require statement matters
require('./models/Survey');
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

/*
* Middlewares do preprocessing of the incoming request before they are sent off to different route handlers.
* They are great location to locate some logic that are common to many different route handlers.
* We are using middlewares for cookie authentication.
*/

/******                           Middlewares Start                   ******/

app.use(bodyParser.json()); // Parse incoming request bodies (for POST, PUT or PATCH requests) in a middleware before your handlers, available under the 'req.body' property.

/* Enabling cookie for the app.
* cookieSession extracts cookie data and assigns it to req.session. (In this, one of the property is passport and inside it is the user id)
* passport then extracts cookie data from req.session object
*/
app.use(
  cookieSession({ // accepts config object
    maxAge: 30 * 24 * 60 * 60 * 1000, // how long cookie can exist in the browser before it automatically expires (here 30 days)
    keys: [keys.cookieKey], // Key to encrypt the cookie (can be multiple)
  })
);
// connecting session to passport
app.use(passport.initialize());
app.use(passport.session());

/******                           Middlewares End                   ******/

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// Handling React build (Front-End)
if (process.env.NODE_ENV === 'production') { // Note: Here, order of statements matters
  // Express will serve up production assets like main.js file or main.css file
  app.use(express.static('client/build'));

  // Express will serve up index.html file if it doesn't recognize the routes
  // This will be executed after checking request match for route handlers (authRoutes, billingRoutes) and after checking if no file matches in client/build repo what the request is looking for.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Dynamic Port Binding
const PORT = process.env.PORT || 5000; // Heroku has the ability to inject Environment variables (for current environment on which NODE is running)

app.listen(PORT); // tell express to listen to port 5000

