/**
 * Created by sanchitgupta001 on 11/06/18.
 */
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

// middlewares
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => { // Here, second arg is used to specify the middleware which we want to be executed whenever we do a post call to this route
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '5$ for 5 credits',
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
