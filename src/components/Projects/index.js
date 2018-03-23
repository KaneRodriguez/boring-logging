import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from 'react-redux-firebase'
import withAuthorization from '../Session/withAuthorization';
import { InteractiveListWithAddButton } from '../InteractiveList'
import Borings from '../Borings'
import withVoiceRecognitionAI from '../VoiceRecognitionAI';
import annyang from 'annyang'

class Projects extends Component {
  state = {
    commands: {}
  }

  componentDidMount() {
    if(annyang) {
      var commands = {
        'create project': this.addProjectFromVoice,
      }          
      this.props.addVoiceCommands(commands)

      this.setState({commands})
    }
  }
  
  addProjectFromVoice = () => {
    if(!this.props.selectedProjectKey) {
      this.addProject({title: 'New Project'})
    } else {
      this.props.onVoiceCommandError("Error: Must be in project view to create project")
    }
  }

  componentWillUnmount() {
    if(annyang) {

        if(this.state.commands) {
            this.props.removeVoiceCommands(this.state.commands)
        }

        this.setState({commands: {}})
    }
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
    let newObj = obj ? obj : {title: 'New Project'}
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
            ? 
            <div>
              <InteractiveListWithAddButton 
                name='Project'
                items={profile.projects}
                removeItem={this.removeProject}
                selectItem={onSelectProject}
                editItemTitle={editProjectTitle}
                addItem={()=> this.addProject()}
                classes={classes} />
            </div>
            : <Borings 
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
  onVoiceCommandError: (error) => dispatch({ type: 'VOICE_COMMAND_ERROR', error }),
});

export default compose(
  withVoiceRecognitionAI,
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
  connect(({ firebase: { profile } }) => ({ profile }))
)(Projects);