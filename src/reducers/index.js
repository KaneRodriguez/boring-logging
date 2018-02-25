import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';

// const initialState = {
//   fetching: false,
//   fetched: false,
//   users: [],
//   error: null,
// }

// const reducer = (state=initialState, action) => {
//   switch(action.type) {
//       case 'FETCH_USERS_PENDING': {
//           return {...state, fetching: true}
//       }
//       case 'FETCH_USERS_REJECTED': {
//           return {...state, fetching: false, error: action.payload}
//       }
//       case 'FETCH_USERS_FULFILLED': {
//           return {
//               ...state, 
//               fetching: false, 
//               fetched: true, 
//               users: action.payload
//           }
//       }
//       default: {
//           return {...state}
//       }
//   }
// }

const INITIAL_NAV_REDUCER_STATE = {
  anchorEl: null, 
  geoLocationErrorMessage: null
}

const navReducer = (state={anchorEl: null}, action) => {
  switch(action.type) {
    case 'SET_NAV_MENU_ANCHOR': {
      return {...state, anchorEl: action.anchorEl}
    }
    case 'SET_GEOLOCATION_FAILED': {
      return {...state, geoLocationErrorMessage: action.error}
    }
    
    default: {
      return {...state}
    }
  }
}
const INITIAL_PROJECTS_REDUCER_STATE = {
  projects: null, 
  selectedProjectKey: null,
  selectedBoringKey: null,
  showingBoringInfo: null,
  showingBoringSampleDescription: null,
}

const projectsReducer = (state=INITIAL_PROJECTS_REDUCER_STATE, action) => {
  switch(action.type) {
    case 'USER_PROJECTS_SET': {
      return {...state, projects: action.projects}
    }
    case 'USER_PROJECT_SELECT': {
      return {...state, selectedProjectKey: action.key}
    }
    case 'USER_PROJECT_BORING_SELECT': {
      return {...state, selectedBoringKey: action.key}
    }
    case 'BOTTOM_NAV_BACK_CLICKED': {

      switch(action.backTo) {
        case 'Borings': return {...state, selectedBoringKey: null, showingBoringInfo: false}
        case 'Projects': return {...state, selectedProjectKey: null}
        default:
        return {...state}
      }
    }
    case 'BORING_INFO_SHOW': {
        return {...state, showingBoringInfo: action.showing}
    }
    case 'AUTH_USER_SET' : {
      if(!action.authUser) {
        return {...state, selectedBoringKey: null, selectedProjectKey: null, showingBoringInfo: false}
      } else {
        return {...state}
      }
    }
    case 'BORING_SAMPLE_DESC_SHOW': {
      return {...state, showingBoringSampleDescription: action.showing}
    }
    
    default: {
      return {...state}
    }
  }
}



const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  navState: navReducer,
  projectState: projectsReducer,
});

export default rootReducer;
