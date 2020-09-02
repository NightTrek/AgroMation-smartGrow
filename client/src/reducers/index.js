import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';

import auth from './auth';
import users from './Users';
import growRooms from './GrowRooms';

export default combineReducers({
  auth,
  form,
  growRooms,
  users
});
