import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import navReducer from './nav';
import projectsReducer from './projects';
import { firebaseReducer } from 'react-redux-firebase'
import commandsReducer from './commands'

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  navState: navReducer,
  projectState: projectsReducer,
  firebase: firebaseReducer,
  commandsState: commandsReducer
});

export default rootReducer;
