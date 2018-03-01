import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { firebaseConnect, withFirebase, isLoaded, getFirebase } from 'react-redux-firebase'

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import BoringView from '../BoringView'
import TextField from 'material-ui/TextField'
import SimpleMap from '../SimpleMap'
import {InteractiveList, InteractiveListWithAddButton} from '../InteractiveList'
// import Dictaphone from '../Dictaphone'
import Webcam from 'react-webcam';
import Todos from '../Todos';
import { CircularProgress } from 'material-ui/Progress';

class HomePage extends Component {

  render() {
    const { authUser, onSelectProject, onSelectProjectBoring, firebase, users, projects, selectedProjectKey, selectedBoringKey, classes, profile} = this.props;
        // <SimpleMap />
        // <Dictaphone />
        // <Webcam />
    let projectsPath = `users/${authUser.uid}/projects/`
    let boringsPath = projectsPath + `${selectedProjectKey}/borings/`

    const addProject = () => firebase.push(projectsPath, {title: 'Click Here to Change Title'})
    const addBoring = () => firebase.push(boringsPath, {title: 'Click Here to Change Title'})
    const removeProject = (key) => firebase.remove(projectsPath + key)
    const removeBoring = (key) => firebase.remove(boringsPath + key)
    const editProjectTitle = (key, title) => firebase.update(projectsPath + key, {title: title})
    const editBoringTitle = (key, title) => firebase.update(boringsPath + key, {title: title})

    return (
      <div>
        {
          isLoaded(profile)
          ? selectedBoringKey
          ? <BoringView 
          firebase={firebase}
          profile={profile}/>
          : !selectedProjectKey
          ? <InteractiveListWithAddButton 
            name='Project'
            items={profile.projects}
            removeItem={removeProject}
            selectItem={onSelectProject}
            editItemTitle={editProjectTitle}
            addItem={addProject}
            classes={classes}
            />
          : <InteractiveListWithAddButton
            name='Boring'
            extraHeader={profile.projects[selectedProjectKey].title}
            items={profile.projects[selectedProjectKey].borings}
            removeItem={removeBoring}
            selectItem={onSelectProjectBoring}
            editItemTitle={editBoringTitle}
            addItem={addBoring}
            classes={classes}
            />
            : <CircularProgress  size={50} />
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedProjectKey: state.projectState.selectedProjectKey,
  selectedBoringKey: state.projectState.selectedBoringKey,
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSelectProject: (key) => dispatch({ type: 'USER_PROJECT_SELECT', key }),
  onSelectProjectBoring: (key) => dispatch({ type: 'USER_PROJECT_BORING_SELECT', key }),
});

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
  connect(({ firebase: { profile } }) => ({ profile }))
)(HomePage);