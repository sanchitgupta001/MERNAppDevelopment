/**
 * Created by sanchitgupta001 on 17/06/18.
 */

// SurveyFormReview shows user their inputs for review
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// lodash
import _map from 'lodash/map';

// actions
import * as actions from '../../actions';

// constants
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _map(formFields, ({ name, label }) => (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    )
  );

  return (
    <div>
      <h5>Please Confirm your entries</h5>
      {reviewFields}
      <div style={{ marginTop: '10px' }}>
        <button
          className="yellow white-text darken-3 btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button
          className="green white-text right btn-flat"
          onClick={() => submitSurvey(formValues, history)}
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

/**
 * You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
