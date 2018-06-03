/**
 * Created by sanchitgupta001 on 02/06/18.
 */
const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google')
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user); // The instance we call logout. req.user is destroyed by passport bcoz we are no longer signed in.
  });

  app.get('/api/current_user', (req, res) => {
    // res.send(req.session); passport works on req.session object to extract cookie data (Here, it extracts user id)
    res.send(req.user);
  });
};
