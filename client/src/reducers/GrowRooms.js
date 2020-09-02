import {ADD_GROWROOM, GROWROOM_ERROR, FETCH_GROWROOMS, FETCH_RECENT, } from "../actions/types";

const INITIAL_STATE = {
  growRooms: [],
  Recent:[],
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_GROWROOM:
      return {...state, growRooms: action.payload };
    case GROWROOM_ERROR:
      return {...state, errorMessage: action.payload };
    case FETCH_GROWROOMS:
      return {...state, growRooms: action.payload };
    case FETCH_RECENT:
      return {...state, recent: action.payload };
    default:
      return state;
  }
}
