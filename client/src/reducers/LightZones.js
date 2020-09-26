import {FETCH_ZONES, PENDING_ZONES } from "../actions/types";

const INITIAL_STATE = {
  zoneArray: [],
  pendingZones:false,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_ZONES:
      return {...state, zoneArray: action.payload };
    case PENDING_ZONES:
        return {...state, pendingZones: action.payload }
    default:
      return state;
  }
}
