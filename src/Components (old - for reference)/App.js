import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Todos from './Todos';
import InteractiveList from './InteractiveList';
import ProjectsView from './ProjectsView';
import BoringsView from './BoringsView';
import BoringEditView from './BoringEditView';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; 
import Button from 'material-ui/Button'; 
import MenuAppBar from './MenuAppBar';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
// import { NavLink, Switch, Route } from 'react-router-dom';
import {withRouter} from 'react-router';
import BackupIcon from 'material-ui-icons/Backup';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import * as routes from '../constants/routes';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import LabelBottomNavigation from './Navigation'
import withAuthentication from './withAuthentication';

//export default App;

// class App extends Component {
//   constructor(){
//     super();
//     this.state = {
//       todos: [],
//       projects: [],
//       currentProject: null,
//       currentBoring: null
//     }
//   }
/*
  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

  getProjects(){
    this.setState({
      projects: [{
        title: "Project 1",
        id: uuid.v4(),
        borings: [
            {
              id:uuid.v4(),
              title: 'Boring 1'
            },
            {
              id:uuid.v4(),
              title: 'Boring 2'
            },
            {
              id:uuid.v4(),
              title: 'Boring  3'
            }
          ]
        }]
    });
  }

  componentWillMount(){
    this.getProjects();
    this.getTodos();
  }

  componentDidMount(){
    this.getTodos();
  }

  handleAddProject(project){
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
  }

  handleRemoveProject(project) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === project.id);
    projects.splice(index, 1);
    this.setState({projects:projects});
  }

  handleSelectProject(project) {
    console.log("Project selected: ", project)
    this.setState({currentProject:project, activeView: "BORINGS"});
    this.props.history.push("/borings");
  }

  handleAddBoring(boring){
    let currentProject = this.state.currentProject;

    if(currentProject == null) {
      console.log("Error: null value")
    }
    else {
      currentProject.borings.push(boring);
      this.setState({
        currentProject: currentProject, 
        currentBoring: boring
      });
    }
  }

  handleRemoveBoring(boring) {
    let currentProject = this.state.currentProject;

    if(currentProject == null) {
      console.log("Error: null value")
    }
    else {
      let borings = this.state.currentProject.borings;
      let index = borings.findIndex(x => x.id === boring.id);
      borings.splice(index, 1);
      this.setState({currentProject:currentProject});
    }

  }

  handleSelectBoring(boring) {
    console.log("Boring selected: ", boring)
    this.setState({currentBoring:boring});
    this.props.history.push("/boring-edit");
  }

  onArrowBackClicked(e) {
    if(this.state.currentBoring)
    {
      this.setState({currentBoring: null});
      this.props.history.push("/borings");
    }
    else if(this.state.currentProject)
    {
      this.setState({currentProject: null});
      this.props.history.push("/projects")
    }
    else {

    }
  }

  render() {
    const { classes } = this.props;


    let currentProjectName = (this.state.currentProject ? this.state.currentProject.title : "");
    let currentProjectBorings= (this.state.currentProject ? this.state.currentProject.borings : []);

    return (
      <MuiThemeProvider>
      <div className="App">

      {this.state.currentProject ? (
      <IconButton color="primary" className={classes.button} aria-label="Back"
      onClick={this.onArrowBackClicked.bind(this)} >
        <ArrowBackIcon />
      </IconButton>
      ): null}


      <Switch>
        <Route exact path='/projects' 
          render={ (props) => 
            <ProjectsView 
            projects={this.state.projects} 
            addProject={this.handleAddProject.bind(this)}
            removeProject={this.handleRemoveProject.bind(this)}
            selectProject={this.handleSelectProject.bind(this)}
            />          
          } 
        />
        <Route exact path='/borings' 
        render={ (props) => 
          <BoringsView 
          projectName={currentProjectName}
          borings={currentProjectBorings}
          addBoring={this.handleAddBoring.bind(this)}
          removeBoring={this.handleRemoveBoring.bind(this)}
          selectBoring={this.handleSelectBoring.bind(this)}
          />       
          } 
        />        
          <Route exact path='/boring-edit' 
          render={ (props) => 
            <BoringEditView 
            boring={this.state.currentBoring}
            projectName={this.state.currentProject.title}
            />      
          } 
        />
      </Switch>

      </div>
      </MuiThemeProvider>

    );
  }*/
//<MenuAppBar />
//        <Todos todos={this.state.todos} />

export default withAuthentication(withStyles(styles)(App));
