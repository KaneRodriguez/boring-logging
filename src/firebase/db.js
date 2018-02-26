import { db } from './firebase';
// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...

export const doCreateProject = (userUid, project) =>
  db.ref(`users/${userUid}/projects`).push(project);

export const doRemoveProject = (userUid, projectUid) =>
  db.ref(`users/${userUid}/projects/${projectUid}`).set({});
  
export const doUpdateProject = (userUid, projectUid, keyValueObj) =>
  db.ref(`users/${userUid}/projects/${projectUid}`).update(keyValueObj);

export const doUpdateProjectBoring = (userUid, projectUid, boringUid, keyValueObj) =>
  db.ref(`users/${userUid}/projects/${projectUid}/borings/${boringUid}`).update(keyValueObj);

export const doUpdateProjectBoringSample = (userUid, projectUid, boringUid, sampleUid, keyValueObj) =>
  db.ref(`users/${userUid}/projects/${projectUid}/borings/${boringUid}/samples/${sampleUid}`).update(keyValueObj);

export const doCreateProjectBoring = (userUid, projectUid, boring) =>
  db.ref(`users/${userUid}/projects/${projectUid}/borings`).push(boring);

export const doRemoveProjectBoring = (userUid, projectUid, boringUid) =>
  db.ref(`users/${userUid}/projects/${projectUid}/borings/${boringUid}`).set({});

export const onceGetUserProjects = (userUid) => 
  db.ref(`users/${userUid}/projects`).once('value');

export const doRemoveBoringSample = (userUid, projectUid, boringUid, sampleUid) =>
  db.ref(`users/${userUid}/projects/${projectUid}/borings/${boringUid}/samples/${sampleUid}`).set({});

export const doCreateBoringSample = (userUid, projectUid, boringUid, sample) =>
  db.ref(`users/${userUid}/projects/${projectUid}/borings/${boringUid}/samples`).push(sample);
   


// export function loadProjects (authUser) {
//   console.log('start loading projects')

//   return (dispatch) => {

//     axios.get('https://boring-logging-dev.firebaseio.com/users/' + authUser.uid +
//     '/projects.json?auth=' + DB_SECRET)
//       .then((res) => {
//         let projects = [];
//         console.log('loaded')
//         for(var i in res.data){
//           for(var i2 in res.data[i]){
//             console.log("Adding to array: ", res.data[i][i2])
//             projects.push(res.data[i][i2])
//           }
//         }

//         if(projects) {
//           console.log('dispatching success')
//           dispatch({type: 'LOAD_PROJECTS_SUCCESS', payload: projects});
//         }
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }
// }