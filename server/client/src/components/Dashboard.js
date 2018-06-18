/**
 * Created by sanchitgupta001 on 16/06/18.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link
          className="btn-floating btn-large red"
          to="/surveys/new"
        >
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;