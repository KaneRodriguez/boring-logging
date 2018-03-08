import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from 'react-redux-firebase'

import withAuthorization from '../Session/withAuthorization';
import { InteractiveListWithAddButton } from '../InteractiveList'
import Borings from '../Borings'
import withVoiceRecognitionAI from '../VoiceRecognitionAI';

class Projects extends Component {
  constructor(props) {
    super(props)

    //this.props.addVoiceCommand('add', 'project', 'with title', this.addProjectWithTitle)
    //this.props.addVoiceCommand('remove', 'project', 'with title', this.removeProjectWithTitle)
  }
  removeProjectWithTitle = (title) => {
    const {profile} = this.props

    console.log('removing project', title)

    Object.keys(profile.projects).map(key => {
      let project = profile.projects[key]
      console.log('looking at project', project)

      if(project.title.trim().toUpperCase() == title.trim().toUpperCase()) {
        this.removeProject(key)
        // break out of mapping?
      }
    })
  }

  removeProject = (key) => {
    const {firebase, authUser} = this.props
    
    let projectsPath = `users/${authUser.uid}/projects/`

    firebase.remove(projectsPath + key)
  }

  addProject = (obj) => {
    const {firebase, authUser} = this.props
    console.log("adding obj", obj)
    let projectsPath = `users/${authUser.uid}/projects/`
    console.log('projects path', projectsPath)
    let newObj = obj ? obj : {title: 'Click Here to Change Title'}
    console.log("new obj", newObj)
    firebase.push(projectsPath, newObj)
  }

  addProjectWithTitle = (title) => {
    this.addProject({title: title})
  }

  render() {
    const { authUser, onSelectProject, firebase, selectedProjectKey, classes, profile} = this.props;

    let projectsPath = `users/${authUser.uid}/projects/`

    const editProjectTitle = (key, title) => firebase.update(projectsPath + key, {title: title})

    return (
      <div>
          { !selectedProjectKey 
            ? <InteractiveListWithAddButton 
                name='Project'
                items={profile.projects}
                removeItem={this.removeProject}
                selectItem={onSelectProject}
                editItemTitle={editProjectTitle}
                addItem={()=> this.addProject()}
                classes={classes}
            />
            : <Borings 
               //addVoiceCommand={this.props.addVoiceCommand}
                project={profile.projects[selectedProjectKey]}
                boringsPath={projectsPath + `${selectedProjectKey}/borings/`}
                firebase={firebase}
            />
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
  withVoiceRecognitionAI,
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
  connect(({ firebase: { profile } }) => ({ profile }))
)(Projects);