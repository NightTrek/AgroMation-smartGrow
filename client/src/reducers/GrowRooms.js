import {ADD_GROWROOM, GROWROOM_ERROR, GET_ROOMS, FETCH_LIVE, FETCH_HISTORY, SET_ROOM, PENDING_ROOMS, SESSION_START, SESSION_ERROR, FETCH_ALARMS } from "../actions/types";

const INITIAL_STATE = {
  rooms: [],
  roomIndex:0,
  Live:{},
  History:{},
  session:{},
  Alarms:{},
  pending:false,
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_GROWROOM:
      return {...state, rooms: action.payload };
    case GROWROOM_ERROR:
      return {...state, errorMessage: action.payload };
    case GET_ROOMS:
      return {...state, rooms: action.payload };
    case PENDING_ROOMS:
      return {...state, pending: action.payload};
    case SET_ROOM:
      
      return {...state, roomIndex: action.payload };
    case FETCH_LIVE:
      return {...state, Live: action.payload };
    case FETCH_HISTORY:
      return {...state, History: action.payload};
    case FETCH_ALARMS:
      return {...state, Alarms: action.payload};
    case SESSION_START:
      return {...state, session: action.payload };
    case SESSION_ERROR:
      return {...state, errorMessage: action.payload};
    default:
      return state;
  }
}