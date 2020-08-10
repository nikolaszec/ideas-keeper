import { combineReducers } from 'redux';
import sessionReducer from './session/sessionReducer';

export default combineReducers({
  session: sessionReducer,
  // more reducers to add here
});
