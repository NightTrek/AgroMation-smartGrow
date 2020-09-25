import {FETCH_USER, FETCH_USER_PENDING,  SET_LOCATION } from "../actions/types";

const INITIAL_STATE = {
  user: {},
  pending:false,
  activeLocation:0
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER:
      return {...state, user: action.payload };
    case FETCH_USER_PENDING:
        return {...state, pending: action.payload }
    case SET_LOCATION:
        return {...state, activeLocation: action.payload };
    default:
      return state;
  }
}
