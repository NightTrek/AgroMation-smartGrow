import {FETCH_USER,FETCH_USER_SUCCESS,  SET_LOCATION } from "../actions/types";

const INITIAL_STATE = {
  user: {},
  activeLocation:0
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER:
      return {...state, user: action.payload };
    case FETCH_USER_SUCCESS:
        return {...state, user: action.payload }
    case SET_LOCATION:
        return {...state, activeLocation: action.payload };
    default:
      return state;
  }
}
