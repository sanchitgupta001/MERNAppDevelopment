/**
 * Created by sanchitgupta001 on 13/06/18.
 */

const keys = require('../../config/keys');

/**
 * Note: We cannot use relative domains here
 */
module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I would like to know your input!</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
