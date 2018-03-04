import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';
import { reactReduxFirebase } from 'react-redux-firebase'
import { createLogger } from "redux-logger"
import promise from "redux-promise-middleware"
import * as firebase from 'firebase';

// react-redux-firebase options
const reduxConfig = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: true, // enable/disable Firebase's database logging
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, reduxConfig)
)(createStore)

const middleware = applyMiddleware(promise(), createLogger());
const store = createStoreWithFirebase(rootReducer, middleware);

export default store;