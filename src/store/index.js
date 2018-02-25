import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';

import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

const middleware = applyMiddleware(promise(), thunk, createLogger());
const store = createStore(rootReducer, middleware);

// store.dispatch({
//     type: "FETCH_USERS",
//     payload: axios.get("http://rest.learncode.academy/api/asdf/users")
// })

export default store;