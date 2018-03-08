const INITIAL_NAV_REDUCER_STATE = {
    anchorEl: null, 
    errorMessage: null,
    sampleDescDialogOpen: false,
    strataDialogOpen: false,
  }
  
  const navReducer = (state=INITIAL_NAV_REDUCER_STATE, action) => {
    switch(action.type) {
      case 'SET_NAV_MENU_ANCHOR': {
        return {...state, anchorEl: action.anchorEl}
      }
      case 'SET_GEOLOCATION_FAILED': {
        return {...state, errorMessage: action.error}
      }  
      case 'VOICE_COMMAND_ERROR': {
        return {...state, errorMessage: action.error}
      }
      case 'SET_SAMPLE_DESC_DIALOG_OPEN': {
        return {...state, sampleDescDialogOpen: action.open}
      }
      case 'SET_STRATA_DIALOG_OPEN': {
        return {...state, strataDialogOpen: action.open}
      }
      
      default: {
        return {...state}
      }
    }
  }

export default navReducer