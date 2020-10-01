import {FETCH_MANAGED_USERS, PENDING_MANAGED_USERS,  ADD_MANAGED_USER } from "../actions/types";

const INITIAL_STATE = {
  user: [],
  pending:false,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_MANAGED_USERS:
      return {...state, user: action.payload };
    case PENDING_MANAGED_USERS:
        return {...state, pending: action.payload }
    case ADD_MANAGED_USER:
        return {...state, activeLocation: action.payload };
    default:
      return state;
  }
}
