/**
 * Created by sanchitgupta001 on 07/06/18.
 */
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; // Gives components the ability to call action creators
import * as actions from '../actions';

// components
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

// BrowserRouter will contain atmost 1 child component
// Route searches for path as a substring
// To match exact path, we use 'exact' attribute
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
