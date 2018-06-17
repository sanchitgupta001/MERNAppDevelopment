/**
 * Created by sanchitgupta001 on 08/06/18.
 */
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

// The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.
// The state produced by combineReducers() namespaces the states of each reducer under their keys as passed to combineReducers().
export default combineReducers({
  auth: authReducer,
  form: reduxForm, // This key can be changed; consult redux-form.com
});
