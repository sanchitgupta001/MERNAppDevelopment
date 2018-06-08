/**
 * Created by sanchitgupta001 on 08/06/18.
 */
import axios from 'axios'; // Promise based HTTP client for the browser and node.js
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};
