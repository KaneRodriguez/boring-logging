import {doSignOut} from '../firebase/auth'

const INITIAL_STATE = {
  authUser: null,
};

const applySetAuthUser = (state, action) => {
  if(!action.authUser) {
    doSignOut(); 
  } else {
    // db.doCreateProject(action.authUser.uid, {title: 'project title!'})
    // db.onceGetUserProjects(action.authUser.uid).then((snapshot) =>
    // Object.keys(snapshot.val()).map(key =>
    //   //console.log(snapshot.val()[key], key)
    //   db.doCreateProjectBoring(action.authUser.uid, key, {title: 'boring title'})
    // )
    // );
    
  }
  return {
    ...state,
    authUser: action.authUser
  }
};

function sessionReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'AUTH_USER_SET' : {
      return applySetAuthUser(state, action);
    }
    default : return state;
  }
}

export default sessionReducer;