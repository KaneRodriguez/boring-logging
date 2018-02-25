import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import InteractiveList from '../InteractiveList'
import BoringView from '../BoringView'
import TextField from 'material-ui/TextField'
import SimpleMap from '../SimpleMap'

class HomePage extends Component {
  componentDidMount() {
    const { authUser, onSetUsers, onSetUserProjects } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );

    if(authUser) {
      db.onceGetUserProjects(authUser.uid).then(snapshot =>
        onSetUserProjects(snapshot.val())
      );
    }
    this.projectKeyPress = this.projectKeyPress.bind(this);
    this.boringKeyPress = this.boringKeyPress.bind(this);
    this.removeProject = this.removeProject.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.removeBoring = this.removeBoring.bind(this);
    this.selectBoring = this.selectBoring.bind(this);
  }

  selectProject(key) {
    const { authUser, onSelectUserProject } = this.props;
    
    onSelectUserProject(key)
  }

  removeProject(key) {
    const { authUser, onSetUserProjects } = this.props;
    
    db.doRemoveProject(authUser.uid, key).then((snapshot) => {
      db.onceGetUserProjects(authUser.uid).then(snapshot =>
        onSetUserProjects(snapshot.val())
      );      
    })
  }

  projectKeyPress(e) {
    const { authUser, onSetUserProjects } = this.props;
 
    if(e.key === 'Enter' && e.target.value !== "")
    {
      let newProject = {
        title: e.target.value
      }

      db.doCreateProject(authUser.uid, newProject).then((snapshot) => {
        db.onceGetUserProjects(authUser.uid).then(snapshot =>
          onSetUserProjects(snapshot.val())
        );      
      })

      e.target.value = '';
      e.preventDefault();
    }
  }

  selectBoring(key) {
    const { authUser, onSelectUserProjectBoring } = this.props;

    console.log("selecting", key)
    
    onSelectUserProjectBoring(key)
  }

  removeBoring(key) {
    const { authUser, onSetUserProjects, selectedProjectKey } = this.props;

    console.log("removing", key)
    
    db.doRemoveProjectBoring(authUser.uid, selectedProjectKey, key).then((snapshot) => {
      db.onceGetUserProjects(authUser.uid).then(snapshot =>
        onSetUserProjects(snapshot.val())
      );      
    })
  }
  
  boringKeyPress(e) {
    const { authUser, selectedProjectKey, onSetUserProjects } = this.props;
 
    if(e.key === 'Enter' && e.target.value !== "")
    {
      let newBoring = {
        title: e.target.value
      }
      
      db.doCreateProjectBoring(authUser.uid, selectedProjectKey, newBoring)
      .then((snapshot) => {
        db.onceGetUserProjects(authUser.uid).then(snapshot =>
          onSetUserProjects(snapshot.val())
        );      
      })

      e.target.value = '';
      e.preventDefault();
    }
  }

  render() {
    const { users, projects, selectedProjectKey, selectedBoringKey} = this.props;
// <SimpleMap />
    return (
      <div>
        {selectedBoringKey
        ?
          <BoringView />
        :
          !selectedProjectKey
          ?
            <InteractiveListView 
            name='Project'
            items={projects}
            removeItem={this.removeProject}
            selectItem={this.selectProject}
            keyPress={this.projectKeyPress}
            />
          :
            <InteractiveListView
            name='Boring'
            extraHeader={projects[selectedProjectKey].title}
            items={projects[selectedProjectKey].borings}
            removeItem={this.removeBoring}
            selectItem={this.selectBoring}
            keyPress={this.boringKeyPress}
            />
          
        }


      </div>
    );
  }
}

const InteractiveListView = ({ name, items, removeItem, selectItem, keyPress, extraHeader }) =>
  <div>
    <h2>My {name}s {!!extraHeader ? ": " + extraHeader: ''}</h2>
    <TextField
    id="with-placeholder"
    label={`Add New ${name}`}
    placeholder={`${name} Name`}
    margin="normal"
    onKeyPress={keyPress}
    />  
    <InteractiveList 
    listName={`Saved ${name}s`}
    items={items} 
    removeItem={removeItem}
    selectItem={selectItem}
    /> 
  </div>

const mapStateToProps = (state) => ({
  users: state.userState.users,
  projects: state.projectState.projects,
  selectedProjectKey: state.projectState.selectedProjectKey,
  selectedBoringKey: state.projectState.selectedBoringKey,
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
  onSetUserProjects: (projects) => dispatch({ type: 'USER_PROJECTS_SET', projects }),
  onSelectUserProject: (key) => dispatch({ type: 'USER_PROJECT_SELECT', key }),
  onSelectUserProjectBoring: (key) => dispatch({ type: 'USER_PROJECT_BORING_SELECT', key }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
