/**
 * Created by sanchitgupta001 on 12/06/18.
 */
const mongoose = require('mongoose');
const Path = require('path-parser').default;
const { URL } = require('url');

// lodash
const _ = require('lodash');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for Voting!');
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false }); // can be false or 0
    res.send(surveys);
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice'); // returns object containing wildcards specified by ':'; all wildcards should match

    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, ...match };
        }
      })
      .compact() // removes undefined events
      .uniqBy('email', 'surveyId')
      .forEach(({ email, surveyId, choice}) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: {email: email, responded: false} // $elemMatch: Match element with following properties
          }
        }, {
          $inc: { [choice]: 1}, // Increment choice by 1
          $set: { 'recipients.$.responded': true}, // Set the responded property of appropriate recipient to true; '$' denotes appropriate found index to update
          lastResponded: new Date()
        }).exec(); // 'exec' executes the query
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err); // unprocessable entity
    }
  });
};
