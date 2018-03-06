const INITIAL_PROJECTS_REDUCER_STATE = {
    projects: null, 
    selectedProjectKey: null,
    selectedBoringKey: null,
    showingBoringInfo: null,
    showingBoringSamples: null,
    showingStrataPlot: null,
    selectedBoringSampleKey: null,
    selectedBoringStrataKey: null,
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
      case 'BORING_SAMPLE_SELECT': {
        return {...state, selectedBoringSampleKey: action.key}
      }
      case 'BORING_STRATA_SELECT': {
        return {...state, selectedBoringStrataKey: action.key}
      }
      case 'BOTTOM_NAV_BACK_CLICKED': {
  
        switch(action.backTo) {
          case 'Borings': return {...state, selectedBoringKey: null, showingBoringInfo: false, showingBoringSamples: false}
          case 'Projects': return {...state, selectedProjectKey: null}
          default:
          return {...state}
        }
      }
      case 'BORING_INFO_SHOW': {
        return {...state, showingBoringInfo: action.showing}
      }
      case 'STRATA_PLOT_SHOW': {
        return {...state, showingStrataPlot: action.showing}
      }
      case 'AUTH_USER_SET' : {
        if(!action.authUser) {
          return {...state, selectedBoringKey: null, selectedProjectKey: null, showingBoringInfo: false}
        } else {
          return {...state}
        }
      }
      case 'BORING_SAMPLE_DESC_SHOW': {
        return {...state, showingBoringSamples: action.showing}
      }
      
      default: {
        return {...state}
      }
    }
  }

  export default projectsReducer;