/**
 * Created by sanchitgupta001 on 17/06/18.
 */
// lodash
import _isEmpty from 'lodash/isEmpty';
// eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
  const invalidEmailsArray = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

  if (invalidEmailsArray.length) {
    if (invalidEmailsArray.filter(email => _isEmpty(email)).length) {
      return 'Please provide non-empty comma separated emails';
    }
    return `These Emails are invalid: ${invalidEmailsArray}`;
  }

  return null;
};
