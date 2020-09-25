import {ADD_GROWROOM, GROWROOM_ERROR, GET_ROOMS, FETCH_RECENT, SET_ROOM, PENDING_ROOMS } from "../actions/types";

const INITIAL_STATE = {
  rooms: [],
  roomIndex:0,
  Recent:[],
  pending:false,
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_GROWROOM:
      return {...state, growRooms: action.payload };
    case GROWROOM_ERROR:
      return {...state, errorMessage: action.payload };
    case GET_ROOMS:
      return {...state, rooms: action.payload };
    case PENDING_ROOMS:
      return {...state, pending: action.payload};
    case SET_ROOM:
      return {...state, roomIndex: action.payload };
    case FETCH_RECENT:
      return {...state, recent: action.payload };
    default:
      return state;
  }
}