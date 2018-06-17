/**
 * Created by sanchitgupta001 on 07/06/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';

/* Redux Thunk middleware allows you to write action creators that return a function instead of an action.
 * The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
 * The inner function receives the store methods 'dispatch' and 'getState' as parameters.
 */
import reduxThunk from 'redux-thunk';

// Provider: Component that makes the store accessible to every component in the App
// It reads changes in store and update all its children components with the new state .
import { Provider } from 'react-redux';

// helpers
import { createStore, applyMiddleware } from 'redux';

// styles
import 'materialize-css/dist/css/materialize.min.css';

// Components
import App from './components/App';
import reducers from './reducers';

// For development mode Testing
// import axios from 'axios';
// window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); // Arguments: reducers, initial state, middleware

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root') // DOM node with id='root' present in index.html
);
