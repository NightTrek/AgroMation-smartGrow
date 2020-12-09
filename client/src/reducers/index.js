import { combineReducers } from "redux";
// import { reducer as form } from 'redux-form';

import auth from './auth';
import users from './Users';
import growRooms from './GrowRooms';
import LightZones from './LightZones';
import managedUsers from "./ManagedUsers";

export default combineReducers({
  auth,
  growRooms,
  users,
  LightZones,
  managedUsers
});
