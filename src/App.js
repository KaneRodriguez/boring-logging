import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Todos from './Components/Todos';
import InteractiveList from './Components/InteractiveList';
import ProjectsView from './Components/ProjectsView';
import BoringsView from './Components/BoringsView';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; 
import Button from 'material-ui/Button'; 
import './App.css';
import MenuAppBar from './Components/MenuAppBar';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos: [],
      projects: [],
      activeView: "PROJECTS",
      currentProject: null
    }
  }

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
        title: "Project 1 title",
        id: uuid.v4(),
        borings: [
            {
              id:uuid.v4(),
              title: 'Boring 1',
              category: 'Web Deisgn'
            },
            {
              id:uuid.v4(),
              title: 'Boring 2',
              category: 'Mobile Development'
            },
            {
              id:uuid.v4(),
              title: 'Boring  3',
              category: 'Web Development'
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

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider>
      <div className="App">

        <MenuAppBar />
        
        {this.state.activeView === "PROJECTS" ? (

          <ProjectsView 
            projects={this.state.projects} 
            addProject={this.handleAddProject.bind(this)}
            removeProject={this.handleRemoveProject.bind(this)}
          />

        ) : this.state.activeView === "BORINGS" ? (

          <BoringsView borings={this.state.currentProject.borings} />

        ) : null}

      </div>
      </MuiThemeProvider>

    );
  }
}
//        <Todos todos={this.state.todos} />

export default withStyles(styles)(App);
