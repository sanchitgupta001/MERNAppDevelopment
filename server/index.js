const express = require('express'); // 'require': Common JS module format for nodeJS, 'import': ES 2015 module format
/*
By calling 'express' as a function, it generates a new application that represents a running express app.
'app' object is used to setup configuration, that will listen to incoming request that are being routed to express side of the app from node side
and then route those requests to different route handlers.
Consult TechStack.xml in draw.io for more info.
*/
const app = express();

// Creating route handlers for incoming requests
app.get('/', (req, res) => { // req: request, res: response, '/': route
  res.send({ hi: 'there'}); // to send data to who ever made the request
});

// Dynamic Port Binding
const PORT = process.env.PORT || 5000; // Heroku has the ability to inject Environment variables (for current environment on which NODE is running)

app.listen(PORT); // tell express to listen to port 5000

