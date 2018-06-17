/**
 * Created by sanchitgupta001 on 16/06/18.
 */
// SurveyField contains logic to render a single label and text input

import React from 'react';

export default ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      <label style={{ fontSize: '15px' }}>{label}</label>
      <input style={{ marginBottom: '5px'}}{...input} />
      <div className="red-text" style={{ marginBottom: '20px', fontSize: '12px'}}>
      { touched && error }
      </div>
    </div>
  );
};
