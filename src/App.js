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
      todos:[]
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
    this.setState({projects: [
      {
        id:uuid.v4(),
        title: 'Business Website',
        category: 'Web Deisgn'
      }
    ]})}
  
  componentWillMount(){
    this.getTodos();
    this.getProjects();
  }

  componentDidMount(){
    this.getTodos();
    
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider>
      <div className="App">
        <MenuAppBar />
        <ProjectsView />
        <BoringsView />

        <Todos todos={this.state.todos} />
      </div>
      </MuiThemeProvider>

    );
  }
}

export default withStyles(styles)(App);
