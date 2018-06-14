/**
 * Created by sanchitgupta001 on 13/06/18.
 */
const sendGrid = require('sendgrid');
const helper = sendGrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recepients}, content) {
    super();

    this.from_email = new helper.Email('no-reply@emailsurvey.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatEmailAddresses(recepients);
  }
}

module.exports = Mailer;
