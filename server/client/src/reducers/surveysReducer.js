/**
 * Created by sanchitgupta001 on 19/06/18.
 */
import { FETCH_SURVEYS } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
