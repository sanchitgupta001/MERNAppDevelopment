/**
 * Created by sanchitgupta001 on 13/06/18.
 */
const sendGrid = require('sendgrid');
const helper = sendGrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients}, content) {
    super();

    this.sgApi = sendGrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@emailsurvey.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatEmailAddresses(recipients);

    this.addContent(this.body); // This is a built-in function from helper.Mail class
    this.addClickTracking();
    this.addRecipients();
  }

  formatEmailAddresses(recipients) {
    return recipients.map(({ email }) => (new helper.Email(email)));
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient); // Adding email addresses to 'To' attribute of email
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(), // convert this object to JSON to send to sendGrid
    });

    const response = await this.sgApi.API(request); // this sends the request to sendGrid; we are returning the response of the API
    return response;
  }
}

module.exports = Mailer;
