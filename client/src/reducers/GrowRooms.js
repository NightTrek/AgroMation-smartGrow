import {ADD_GROWROOM, GROWROOM_ERROR, GET_ROOMS, FETCH_LIVE, FETCH_HISTORY, SET_ROOM, PENDING_ROOMS, SESSION_START, SESSION_ERROR } from "../actions/types";

const INITIAL_STATE = {
  rooms: [],
  roomIndex:0,
  Live:{},
  History:{},
  session:{},
  interval:{},
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
      console.log("get rooms");
      console.log(action.payload);
      return {...state, rooms: action.payload };
    case PENDING_ROOMS:
      return {...state, pending: action.payload};
    case SET_ROOM:
      console.log("Set rooms");
      console.log(action.payload);
      return {...state, roomIndex: action.payload };
    case FETCH_LIVE:
      console.log("Fetch Live");
      console.log(action.payload);
      return {...state, Live: action.payload };
    case FETCH_HISTORY:
      return {...state, History: action.payload}
    case SESSION_START:
      console.log('Session start')
      console.log(action.payload)
      return {...state, session: action.payload };
    case SESSION_ERROR:
      console.log('Session ERROR')
      console.log(action.payload)
      return {...state, errorMessage: action.payload};
    default:
      return state;
  }
}