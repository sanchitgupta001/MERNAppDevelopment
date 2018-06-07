/**
 * Created by sanchitgupta001 on 07/06/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';

// Provider: Component that makes the store accessible to every component in the App
// It reads changes in store and update all its children components with the new state .
import { Provider } from 'react-redux';

// helpers
import { createStore, applyMiddleware } from 'redux';

// Components
import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware()); // Arguments: reducers, initial state, middleware

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')); // DOM node with id='root' present in index.html
