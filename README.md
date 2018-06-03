# MERN App Development
This repository contains basic app development using MERN stack.

**Node**: Javascript runtime used to execute code outside of the browser.

**Express**: Library that runs in the Node runtime. Has helpers to make dealing with HTTP traffic easier.

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


