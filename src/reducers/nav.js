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

export default navReducer