# MERN App Development
This repository contains basic app development using MERN stack.

**Mongo DB**: MongoDB is an open-source document database and leading NoSQL database. MongoDB is written in C++.

**Express**: Library that runs in the Node runtime. Has helpers to make dealing with HTTP traffic easier.

**React JS**: React is a front-end library developed by Facebook. It is used for handling the view layer for web and mobile apps. ReactJS allows us to create reusable UI components.

**Node**: Javascript runtime used to execute code outside of the browser.

We are using passport.js for Google OAuth implementation.
Currently, only **Google OAuth** is implemented but later other OAuths can also be implemented.
For Mongo implementation, we are using **Mongoose** library.
For **MongoDB**, we are using database created at mlab.com.

To get started, you just need to do **npm install** to install dependencies for the project.
Also, you need to create **dev.js** for storing all your development secret keys for Google OAuth, MongoDB, cookies, etc. and setup environment variables for your production environment on respective server you are using.

Here, we are using cookie-session library instead of express-session library bcoz the data we are storing in session is small. (Only user ID)

For cookie-session, we say cookie is the session. It contains all of the data related to the current session. It contains actual user ID.

For the case of express-session, it stores the reference to the current session, i.e, in the cookie it stores the id to the session.
So, every time, it takes session id, looksup all relevant info from a 'session store' and then fetches us the required info from the session store.
Also, for this we need to set the relevant session store.
But advantage of this is that we can hold arbitrary amounts of data unlike cookie-session where we have a limit of 4KB.

To use front-end react server and express server concurrently, we are using **concurrently** npm library.
**proxy** is required in package.json for client(ReactJS stuff) for development mode to switch to express server for backend stuff on redirect.
There are basically 2 reasons we using this proxy approach for our development Environment:
1. When we are using cookies, for single request (for example) to localhost:3000, cookies will be used by the browser but when we are making request to
localhost:5000, Browser(by default) does not include cookies.
2. CORS(Cross-origin Resource Sharing): This issue will not be there when we are using single request server (for example: localhost:3000 here). But when we are redirecting to different domain
(like localhost:5000), browser sometimes give error for CORS request.

We are using **redux-thunk** npm library. Redux-Thunk is the most popular middleware used to handle asynchronous actions in Redux.

Also, for styling and css stuff, we are using **materialize**. For more info regarding materialize, you can visit: https://materializecss.com/

For Billing feature implementation using credit/debit cards, we have used **stripe** module in the backend and **react-stripe-checkout** module on the react side.

For Email service, we are using Send Grid. For more info, visit http://sendgrid.com/
