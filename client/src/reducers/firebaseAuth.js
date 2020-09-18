import {ATTEMPTING_LOGIN, LOGIN_USER, LOGOUT} from "../actions/types";
import * as initialState from "../consts/AuthStartingState"

module.exports = function(currentstate, action) {
  switch (action.type) {
    case ATTEMPTING_LOGIN:
      return {
        currently: C.AWAITING_AUTH_RESPONSE,
        username: "guest",
        uid: null
      };
    case LOGOUT:
      return {
        currently: C.ANONYMOUS,
        username: "guest",
        uid: null
      };
    case LOGIN_USER:
      return {
        currently: C.LOGGED_IN,
        username: action.username,
        uid: action.uid
      };
    default:
      return currentstate || initialState.auth;
  }
};