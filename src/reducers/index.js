import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import navReducer from './nav';
import projectsReducer from './projects';
import {firebase} from '../firebase'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  navState: navReducer,
  projectState: projectsReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
