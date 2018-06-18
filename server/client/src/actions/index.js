/**
 * Created by sanchitgupta001 on 08/06/18.
 */
// All of our "action creators"
// Action Creators are functions that return actions!
import axios from 'axios'; // Promise based HTTP client for the browser and node.js
import {
  FETCH_USER,
  FETCH_SURVEYS,
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleStripeToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data }); // bcoz we are assuming that we will be getting same user model like fetchUser
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
