/**
 * Created by sanchitgupta001 on 16/06/18.
 */

// SurveyForm shows user input form
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

// lodash
import _map from 'lodash/map';
import _forEach from 'lodash/forEach';

// components
import SurveyField from './SurveyField';

// utils
import validateEmails from '../../utils/validateEmails';

// constants
import formFields from './formFields';

class SurveyForm extends Component {

  renderFields() {
    // Field: name denotes the key in redux store; component can be custom or vanilla html component
    return _map(formFields, ({ label, name }) => (
        <Field
          component={SurveyField}
          type="text"
          name={name}
          label={label}
          key={name}
        />
      )
    );
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} // 'handleSubmit' is provided by redux-form itself
        >
          {this.renderFields()}
          <Link
            to="/surveys"
            className="red btn-flat left white-text"
          >
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');
  _forEach(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'This Field is Required';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false, // To retain the values on 'Back'
})(SurveyForm);
