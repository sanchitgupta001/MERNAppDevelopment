/**
 * Created by sanchitgupta001 on 17/06/18.
 */

// SurveyFormReview shows user their inputs for review
import React from 'react';
import { connect } from 'react-redux';

// lodash
import _map from 'lodash/map';

// actions
import * as actions from '../../actions';

// constants
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
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
          onClick={() => submitSurvey(formValues)}
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

export default connect(mapStateToProps, actions)(SurveyFormReview);
