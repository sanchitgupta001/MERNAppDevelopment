/**
 * Created by sanchitgupta001 on 16/06/18.
 */

// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

// components
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  state = { showFormReview: false};

  renderContent() {
    return this.state.showFormReview
    ? <SurveyFormReview
        onCancel={() => this.setState({ showFormReview: false })}
      />
    : <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />;
  }

  render() {
    return (
      <div style={{ marginTop: '10px' }}>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
