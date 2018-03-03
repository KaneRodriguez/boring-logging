import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from 'react-redux-firebase'

import withAuthorization from '../Session/withAuthorization';
import { InteractiveListWithAddButton } from '../InteractiveList'
import Borings from '../Borings'

class Projects extends Component {

  render() {
    const { authUser, onSelectProject, firebase, selectedProjectKey, classes, profile} = this.props;

    let projectsPath = `users/${authUser.uid}/projects/`

    const addProject = () => firebase.push(projectsPath, {title: 'Click Here to Change Title'})
    const removeProject = (key) => firebase.remove(projectsPath + key)
    const editProjectTitle = (key, title) => firebase.update(projectsPath + key, {title: title})

    return (
      <div>
          { !selectedProjectKey 
            ? <InteractiveListWithAddButton 
                name='Project'
                items={profile.projects}
                removeItem={removeProject}
                selectItem={onSelectProject}
                editItemTitle={editProjectTitle}
                addItem={addProject}
                classes={classes}
            />
            : <Borings />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedProjectKey: state.projectState.selectedProjectKey,
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSelectProject: (key) => dispatch({ type: 'USER_PROJECT_SELECT', key }),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
  connect(({ firebase: { profile } }) => ({ profile }))
)(Projects);